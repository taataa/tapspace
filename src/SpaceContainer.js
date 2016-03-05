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

var SpaceContainer = function (emitter) {
  // Parameters
  //   emitter, an Emitter.

  // Each container has an id. That is used by the parent containers.
  emitter.id = seqid.next().toString();

  // Containers with null parent are root containers i.e. spaces.
  // SpaceContainer#remove sets _parent to null.
  emitter._parent = null;

  // Dict over list because key search time complexity
  emitter._content = {};

  // To be able to remove event handlers
  emitter._transformedHandlers = {};

  emitter.has = function (spacecontainer) {
    // Return
    //   true if spacetaa in space
    return spacecontainer._parent === this;
  };

  emitter.setParent = function (newParent) {
    // Add to new parent container.

    if (this._parent === null && newParent !== null) {
      this._parent = newParent;
      this._parent._addChild(this);
      this.emit('added', this, this._parent);
    }
    // else TODO
  };

  emitter.remove = function () {
    // Remove this space container from parent container.

    if (this._parent !== null) {
      var p = this._parent;
      this._parent = null; // Becomes new root container.
      p._removeChild(this);
      this.emit('removed', this, p);
    } // else in null space already
  };

  emitter._addChild = function (child) {
    // To be called from child.setParent().
    //
    // Parameters
    //   child, A SpaceContainer
    //
    // Return
    //   undefined
    //
    // Dev. note:
    //   Previously this was called from the SpaceContainer constructor.
    //   However, because SpaceContainer upgrade is done before other
    //   upgrades, the child would not be ready to be added to parent.
    //   Therefore

    var sc = child; // alias
    var self = this;

    this._content[sc.id] = sc;

    // Start to listen if child has transformed
    var handler = function () {
      self.emit('contentTransformed', sc);
    };
    sc.on('transformed', handler);
    sc.on('contentTransformed', handler);
    this._transformedHandlers[sc.id] = handler;

    this.emit('contentAdded', sc);
  };

  emitter._removeChild = function (spacecontainer) {
    // To be called from SpaceContainer#remove
    // Precondition: spacecontainer in space

    var sc = spacecontainer; // alias
    delete this._content[sc.id];

    // Remove handlers
    var h = this._transformedHandlers[sc.id];
    delete this._transformedHandlers[sc.id];
    sc.off('transformed', h);
    sc.off('contentTransformed', h);

    this.emit('contentRemoved', sc);
  };
};

module.exports = SpaceContainer;
