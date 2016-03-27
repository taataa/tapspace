/*
Emits
  contentAdded
  contentRemoved
    not thrown if the content to remove did not exist in the first place.
  contentTransformed
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
  emitter._transformedHandlers = {};

  emitter.has = function (spaceNode) {
    // Return
    //   true if spacetaa in space
    return spaceNode._parent === this;
  };

  emitter.getParent = function () {
    return this._parent;
  };

  emitter.getRootParent = function () {
    if (this._parent === null) {
      return this;
    } // else
    return this._parent.getRootParent();
  };

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

  emitter.getAllChildren = function () {
    // All descendants in a list, including the children.
    var i, children, child, arr;
    arr = [];
    children = this.getChildren();
    for (i = 0; i < children.length; i += 1) {
      child = children[i];
      arr = arr.concat(child, child.getAllChildren());
    }
    return arr;
  };

  emitter.setParent = function (newParent) {
    // Add to new parent.

    var oldParent = this._parent;

    if (oldParent === null) {
      if (newParent === null) {
        // From root to root.
        // Do nothing
      } else {
        // From root to child.
        this._parent = newParent;
        this._parent._addChild(this);
        this.emit('added', this, this._parent, null);
        newParent.emit('contentAdded', this, this._parent, null);
      }
    } else {
      if (newParent === null) {
        // From child to root.
        this._parent = null; // Becomes new root node.
        oldParent._removeChild(this);
        this.emit('removed', this, oldParent, null);
        oldParent.emit('contentRemoved', this, oldParent, null);
      } else {
        // From child to child.
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

  emitter.remove = function () {
    // Remove this space node from its parent.
    // Return: see setParent
    return this.setParent(null);
  };

  emitter._addChild = function (child) {
    // To be called from child.setParent().
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
    var transformedHandler = function (a, b, c) {
      self.emit('contentTransformed', a, b, c);
    };
    // added and removed events are not listened because
    // for after successfully made add or remove,
    // contentAdded and contentRemoved are fired in setParent.
    sc.on('contentAdded', addedHandler);
    sc.on('contentRemoved', removedHandler);
    sc.on('transformed', transformedHandler);
    sc.on('contentTransformed', transformedHandler);
    this._addedHandlers[sc.id] = addedHandler;
    this._removedHandlers[sc.id] = removedHandler;
    this._transformedHandlers[sc.id] = transformedHandler;
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

    h = this._transformedHandlers[sc.id];
    delete this._transformedHandlers[sc.id];
    sc.off('transformed', h);
    sc.off('contentTransformed', h);
  };
};

module.exports = SpaceNode;
