/*
API v3.0.0

Emits
  contentAdded
  contentRemoved
    not thrown if the content to remove did not exist in the first place.
*/
var Emitter = require('component-emitter');

// Unique ID generator. Unique over session.
// Usage: seqid.next()
// Return: int
var seqid = require('seqid')(0);

var SpaceNode = function (emitter) {
  // Parameters
  //   emitter, an Emitter.

  // Each node has an id. That is used by the parent nodes and in views.
  emitter.id = seqid.next().toString();

  // Nodes with null parent are root nodes i.e. spaces.
  // SpaceNode#remove sets _parent to null.
  emitter._parent = null;

  // Dict over list because key search time complexity
  emitter._children = {};

  // We need to store built handlers bound to children
  // to be able to remove the handlers when child is removed.
  emitter._addedHandlers = {};
  emitter._removedHandlers = {};

  emitter.getChildren = function () {
    // Return child SpaceNodes in a list.
    // Does not include the children of the children.
    var id, arr, obj;
    arr = [];
    obj = this._children;
    for (id in obj) {
      arr.push(obj[id]);
    }
    return arr;
  };

  emitter.getDescendants = function () {
    // All descendants in a list, including the children.
    var i, children, child, arr;
    arr = [];
    children = this.getChildren();
    for (i = 0; i < children.length; i += 1) {
      child = children[i];
      arr = arr.concat(child, child.getDescendants());
    }
    return arr;
  };

  emitter.getParent = function () {
    return this._parent;
  };

  emitter.getRootParent = function () {
    // Get the predecessor without parents in recursive manner.
    if (this._parent === null) {
      return this;
    }  // else
    return this._parent.getRootParent();
  };

  emitter.hasChild = function (spaceNode) {
    // Return
    //   true if spaceNode is a child of this.
    return spaceNode._parent === this;
  };

  emitter.hasDescendant = function (spaceNode) {
    // Return
    //   true if spaceNode is a descendant of this.
    var p = spaceNode._parent;
    while (p !== null && p !== this) {
      p = p._parent;
    }
    if (p === null) {
      return false;
    }  // else
    return true;
  };

  emitter.remove = function () {
    // Remove this space node from its parent.
    // Return: see setParent
    return this.setParent(null);
  };

  emitter.setParent = function (newParent) {
    // Add to new parent.

    // Dev note about cyclic relationship detection:
    //   A
    //   |
    //  / \
    // B   C
    //
    // Different cases. The emitter relationship status changes...
    //   from root to root:
    //     no worries about cyclic structures
    //   from root to child:
    //     If the new parent is a descendant of the emitter, problems.
    //     If the new parent the emitter itself, problems.
    //   from child to root:
    //     Loses parenthood. No cyclic worries.
    //   from child to child:
    //     If the new parent is a descendant of the emitter, problems.
    //     If the new parent the emitter itself, problems.
    // If new parent has the emitter as descendant already...
    //   then no worries because emitter would only create a new branch.

    var oldParent = this._parent;

    if (oldParent === null) {
      if (newParent === null) {
        // From root to root.
        // Do nothing
      } else {
        // From root to child.
        // Prevent cycles.
        if (this === newParent || this.hasDescendant(newParent)) {
          throw new Error('Cyclic parent-child relationships are forbidden.');
        }
        this._parent = newParent;
        this._parent._addChild(this);
        this.emit('added', this, this._parent, null);
        newParent.emit('contentAdded', this, this._parent, null);
      }
    } else {
      if (newParent === null) {
        // From child to root.
        this._parent = null;  // Becomes new root node.
        oldParent._removeChild(this);
        this.emit('removed', this, oldParent, null);
        oldParent.emit('contentRemoved', this, oldParent, null);
      } else {
        // From child to child.
        // Prevent cycles.
        if (this === newParent || this.hasDescendant(newParent)) {
          throw new Error('Cyclic parent-child relationships are forbidden.');
        }
        this._parent = newParent;
        oldParent._removeChild(this);
        newParent._addChild(this);
        this.emit('removed', this, oldParent, newParent);
        this.emit('added', this, newParent, oldParent);
        // With both oldParent and newParent, SpaceView is able to
        // decide whether to keep same HTMLElement or recreate it.
        oldParent.emit('contentRemoved', this, oldParent, newParent);
        newParent.emit('contentAdded', this, newParent, oldParent);
      }
    }

  };

  emitter._addChild = function (child) {
    // To be called from child.setParent().
    // If called from anywhere else, ensure cyclic relationships are detected.
    //
    // Parameters
    //   child, A SpaceNode
    //
    // Return
    //   undefined
    //
    // Dev. note:
    //   Previously this was called from the SpaceNode constructor.
    //   However, because SpaceNode upgrade is done before other
    //   upgrades, the child would not be ready to be added to parent.

    var sc = child; // alias
    var self = this;

    this._children[sc.id] = sc;

    // Start to listen if child has beed added, removed or transformed
    var addedHandler = function (a, b, c) {
      self.emit('contentAdded', a, b, c);
    };
    var removedHandler = function (a, b, c) {
      self.emit('contentRemoved', a, b, c);
    };
    // added and removed events are not listened because
    // for after successfully made add or remove,
    // contentAdded and contentRemoved are fired in setParent.
    sc.on('contentAdded', addedHandler);
    sc.on('contentRemoved', removedHandler);
    this._addedHandlers[sc.id] = addedHandler;
    this._removedHandlers[sc.id] = removedHandler;
  };

  emitter._removeChild = function (child) {
    // To be called from SpaceNode#remove
    // Precondition: child in space
    var sc, h;

    sc = child; // alias
    delete this._children[sc.id];

    // Remove handlers
    h = this._addedHandlers[sc.id];
    delete this._addedHandlers[sc.id];
    sc.off('contentAdded', h);

    h = this._removedHandlers[sc.id];
    delete this._removedHandlers[sc.id];
    sc.off('contentRemoved', h);
  };
};

module.exports = SpaceNode;
