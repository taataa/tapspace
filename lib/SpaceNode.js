//
// SpaceNode
//
// Emits
//   contentAdded
//     after a descendant has been added
//   contentRemoved
//     after a descendant has been removed
//   removed
//     after detached from parent
//
// 2018-01-18
// Changes to 2017-12-00 dev decision.
//
//   Events about child node addition or removal are no longer emitted
//   by all ancestors. The parent of the new node is the only one to
//   emit contentAdded and contentRemoved. The new refactored SpaceViewHTML
//   listens the elements directly instead of the root, Space. Therefore
//   the bubbling of contentAdded and contentRemoved events is no longer
//   needed.
//
// 2017-12-00
// Dev decision about listening events:
//
//   Do not listen externally accessible events internally.
//   Use recursive function calls instead.
//   There is a couple of reasons for this.
//   First, chains of event handlers are somewhat hard to debug.
//   It gets harder when an event has multiple handlers.
//   Second, the execution order of external and internal handlers
//   is unspecified. If same events are listened both internally and
//   externally, execution-order related bugs will happen and
//   those are very hard to debug.
//
//   Example:
//     The node emits 'removed' after being detached from parent.
//     In v3, the parent listened for this event and handled it
//     by emitting 'contentRemoved'. The parent also listened
//     the child's 'contentRemoved' and handled it by echoing.
//     The goal was to let SpaceViews react to removals by
//     just listening to Space. This caused a bug in setParent
//     with non-trivial node hierarchy. Debugging it required
//     following complex event chains and there were suprising
//     handlers along the way. The bug was impossible to find.
//

var Emitter = require('component-emitter')
var extend = require('extend')
// Unique ID generator. Unique over session.
// Usage: seqid.next()
// Return: int
var seqid = require('seqid')(0)

var SpaceNode = function () {
  Emitter.call(this)

  // Each node has an id. That is used by the parent nodes and in views.
  this.id = seqid.next().toString()

  // Nodes with null parent are root nodes i.e. spaces.
  // SpaceNode#remove sets _parent to null.
  this._parent = null

  // Dict over list because key search time complexity
  this._children = {}
}

var p = extend({}, Emitter.prototype)
SpaceNode.prototype = p

p.addChild = function (child) {
  // Add the given SpaceNode as a child and remove it from its old parent.
  child.setParent(this)

  return this
}

p.getAncestors = function () {
  // Return an array of SpaceNodes, _parent at [0], _parent._parent at [1],
  // and so on.
  //
  var pa = this._parent
  var ancs = []

  while (pa !== null) {
    ancs.push(pa)
    pa = pa._parent
  }

  return ancs
}

p.getChildren = function () {
  // Return child SpaceNodes in a list.
  // Does not include the children of the children.
  //
  // Return
  //   Array
  //
  var id, arr, obj
  arr = []
  obj = this._children
  for (id in obj) {
    if (obj.hasOwnProperty(id)) {
      arr.push(obj[id])
    }
  }
  return arr
}

p.getDescendants = function () {
  // All descendants in a list, including the children.
  //
  var i, children, child, arr
  arr = []
  children = this.getChildren()
  for (i = 0; i < children.length; i += 1) {
    child = children[i]
    arr = arr.concat(child, child.getDescendants())
  }
  return arr
}

p.getParent = function () {
  return this._parent
}

p.getRootParent = function () {
  // Get the predecessor without parents in recursive manner.
  if (this._parent === null) {
    return this
  }  // else
  return this._parent.getRootParent()
}

p.hasChild = function (spaceNode) {
  // Return
  //   true if spaceNode is a child of this.
  return spaceNode._parent === this
}

p.hasDescendant = function (spaceNode) {
  // Return
  //   true if spaceNode is a descendant of this.
  //
  var p = spaceNode._parent
  while (p !== null && p !== this) {
    p = p._parent
  }
  if (p === null) {
    return false
  }  // else
  return true
}

p.isRoot = function () {
  return this._parent === null
}

p.remove = function () {
  // Remove this space node from its parent.
  // Return: see setParent
  return this.setParent(null)
}

p.setParent = function (newParent) {
  // Add node to new parent. Will be removed from old parent.
  //
  // Emits:
  //   removed, after node is removed from old parent
  //   added, after node is added to new parent
  //
  // Causes emits:
  //   oldParent emits contentRemoved after node is removed
  //   newParent emits contentAdded after node is added
  //

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
  //

  if (typeof newParent === 'undefined') {
    throw new Error('Parameter \'newParent\' is required.')
  }

  var oldParent = this.getParent()

  if (newParent === oldParent) {
    // Do nothing
    return
  }

  if (oldParent === null) {
    if (newParent === null) {
      // SpaceNode's position changed from root to root.
      // Do nothing
    } else {
      // From root to child.
      // Add only.

      // Prevent cycles.
      if (this === newParent || this.hasDescendant(newParent)) {
        throw new Error('Cyclic parent-child relationships are forbidden.')
      }
      this._parent = newParent
      this._parent._addChild(this)

      this.emit('added', this, newParent, null)
      newParent.emit('contentAdded', this, newParent, null)
    }
  } else {
    if (newParent === null) {
      // From child to root.
      // Remove only.

      this._parent = null
      oldParent._removeChild(this)

      this.emit('removed', this, null, oldParent)
      oldParent.emit('contentRemoved', this, null, oldParent)
    } else {
      // From child to child.
      // Remove and add.

      // Prevent cycles.
      if (this === newParent || this.hasDescendant(newParent)) {
        throw new Error('Cyclic parent-child relationships are forbidden.')
      }
      this._parent = newParent
      oldParent._removeChild(this)
      newParent._addChild(this)

      // With both oldParent and newParent, SpaceView is able to
      // decide whether to keep same HTMLElement or recreate it.
      this.emit('removed', this, newParent, oldParent)
      oldParent.emit('contentRemoved', this, newParent, oldParent)

      this.emit('added', this, newParent, oldParent)
      newParent.emit('contentAdded', this, newParent, oldParent)
    }
  }
}

p._addChild = function (spaceNode) {
  // To be called from spaceNode.setParent().
  // If called from anywhere else, ensure cyclic relationships are detected.
  this._children[spaceNode.id] = spaceNode
}

p._removeChild = function (spaceNode) {
  // To be called from spaceNode.setParent().
  // Precondition: spaceNode is in space
  delete this._children[spaceNode.id]
}

module.exports = SpaceNode
