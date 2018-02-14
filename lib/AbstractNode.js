//
// AbstractNode
//
// Emits
//   childAdded
//     after a descendant has been added
//   childRemoved
//     after a descendant has been removed
//   added
//     after added to new parent
//   removed
//     after detached from parent
//
// 2018-01-18
// Changes to 2017-12-00 dev decision.
//
//   Events about child node addition or removal are no longer emitted
//   by all ancestors. The parent of the new node is the only one to
//   emit childAdded and childRemoved. The new refactored SpaceView
//   listens the elements directly instead of the root, Space. Therefore
//   the bubbling of childAdded and childRemoved events is no longer
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
//     by emitting 'childRemoved'. The parent also listened
//     the child's 'childRemoved' and handled it by echoing.
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

var AbstractNode = function () {
  Emitter.call(this)

  // Each node has an id. That is used by the parent nodes and in views.
  this.id = seqid.next().toString()

  // Nodes with null parent are root nodes i.e. spaces.
  // AbstractNode#remove sets _parent to null.
  this._parent = null

  // Keep track on node siblings in two-way linked list manner.
  this._prevSibling = null
  this._nextSibling = null

  // Dict because good key search time complexity
  this._children = {}
  // List for children order
  this._order = []
}

var p = extend({}, Emitter.prototype)
AbstractNode.prototype = p

p.addChild = function (child, i) {
  // Add the given AbstractNode as a child and remove it from its old parent.
  child.setParent(this, i)

  return this
}

p.bringAbove = function (sibling) {
  // Remove this node from the old parent and add to a new parent so that
  // the given node becomes the next sibling of the node.
  //
  if (sibling.isRoot()) {
    throw new Error('Cannot send after a root node.')
  }

  var newParent = sibling._parent
  var index = newParent._order.indexOf(sibling)

  // Index is off by 1 if same parent and the item is moved toward back.
  // Smaller or EQUAL to is needed to ensure correct position if indices equal.
  var oldParent = this._parent
  if (oldParent === newParent) {
    if (oldParent._order.indexOf(this) <= index) {
      index = index - 1
    }
  }

  this.setParent(sibling._parent, index + 1)
}

p.bringToFront = function () {
  // Remove this node and reinsert it as the last child.
  //
  if (this.isRoot()) {
    // Already back
    return
  }

  var index = this._parent._order.length
  this.setParent(this._parent, index)
}

p.getAncestors = function () {
  // Return an array of AbstractNodes, _parent at [0], _parent._parent at [1],
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
  // Return child AbstractNodes in a list.
  // Does not include the children of the children.
  //
  // Return
  //   Array
  //
  return this._order.slice() // copy
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

p.getFirstChild = function () {
  if (this._order.length < 1) {
    return null
  }

  return this._order[0]
}

p.getLastChild = function () {
  if (this._order.length < 1) {
    return null
  }

  return this._order[this._order.length - 1]
}

p.getNextSibling = function () {
  return this._nextSibling
}

p.getParent = function () {
  return this._parent
}

p.getPreviousSibling = function () {
  return this._prevSibling
}

p.getRootParent = function () {
  // Get the predecessor without parents in recursive manner.
  if (this._parent === null) {
    return this
  }  // else
  return this._parent.getRootParent()
}

p.hasChild = function (abstractNode) {
  // Return
  //   true if abstractNode is a child of this.
  return abstractNode._parent === this
}

p.hasDescendant = function (abstractNode) {
  // Return
  //   true if abstractNode is a descendant of this.
  //
  var p = abstractNode._parent
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

p.sendBelow = function (sibling) {
  // Remove this node from the old parent and add to a new parent so that
  // the given node becomes the next sibling of the node.
  //
  if (sibling.isRoot()) {
    throw new Error('Cannot bring before a root node.')
  }

  var newParent = sibling._parent
  var index = newParent._order.indexOf(sibling)

  // Index is off by 1 if same parent and the item is moved toward back.
  var oldParent = this._parent
  if (oldParent === newParent) {
    if (oldParent._order.indexOf(this) < index) {
      index = index - 1
    }
  }

  this.setParent(sibling._parent, index)
}

p.sendToBack = function () {
  // Remove this node and reinsert it as the first child.
  //
  if (this.isRoot()) {
    // Already first
    return
  }

  this.setParent(this._parent, 0)
}

p.setParent = function (newParent, index) {
  // Add node to new parent. Will be removed from old parent.
  // Optional index defines the new position among siblings.
  //
  // Parameters:
  //   newParent
  //     an AbstractNode
  //   index
  //     integer, optional, default to last index. Index of 0 will
  //     insert the node as the first child.
  //
  // Emits:
  //   removed, after node is removed from old parent
  //   added, after node is added to new parent
  //
  // Causes emits:
  //   oldParent emits childRemoved after node is removed
  //   newParent emits childAdded after node is added
  //
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

  if (typeof index === 'undefined' && newParent !== null) {
    index = newParent._order.length
  }

  var oldParent = this._parent

  if (oldParent === null) {
    if (newParent === null) {
      // AbstractNode's position changed from root to root.
      // Do nothing
    } else {
      // From root to child.
      // Add only.

      // Prevent cycles.
      if (this === newParent || this.hasDescendant(newParent)) {
        throw new Error('Cyclic parent-child relationships are forbidden.')
      }

      newParent._addChild(this, index)

      this.emit('added', {
        source: this,
        newParent: newParent,
        oldParent: null
      })
      newParent.emit('childAdded', {
        source: newParent,
        newChild: this,
        oldParent: null
      })
    }
  } else {
    if (newParent === null) {
      // From child to root.
      // Remove only.

      oldParent._removeChild(this)

      this.emit('removed', {
        source: this,
        newParent: null,
        oldParent: oldParent
      })
      oldParent.emit('childRemoved', {
        source: oldParent,
        oldChild: this,
        newParent: null
      })
    } else {
      // From child to child.
      // Remove and add.

      // Prevent cycles.
      if (this === newParent || this.hasDescendant(newParent)) {
        throw new Error('Cyclic parent-child relationships are forbidden.')
      }

      oldParent._removeChild(this)
      newParent._addChild(this, index)

      // With both oldParent and newParent, SpaceView is able to
      // decide whether to keep same HTMLElement or recreate it.
      this.emit('removed', {
        source: this,
        newParent: newParent,
        oldParent: oldParent
      })
      oldParent.emit('childRemoved', {
        source: oldParent,
        oldChild: this,
        newParent: newParent
      })
      this.emit('added', {
        source: this,
        newParent: newParent,
        oldParent: oldParent
      })
      newParent.emit('childAdded', {
        source: newParent,
        newChild: this,
        oldParent: oldParent
      })
    }
  }
}

p._addChild = function (abstractNode, index) {
  // To be called from abstractNode.setParent().
  // If called from anywhere else, ensure cyclic relationships are detected.
  var n = abstractNode
  var prev = this._order[index - 1]
  var next = this._order[index]

  n._parent = this

  if (prev) {
    n._prevSibling = prev
    prev._nextSibling = n
  } else {
    n._prevSibling = null
  }

  if (next) {
    n._nextSibling = next
    next._prevSibling = n
  } else {
    n._nextSibling = null
  }

  this._children[n.id] = n
  this._order.splice(index, 0, n)
}

p._removeChild = function (abstractNode) {
  // To be called from abstractNode.setParent().
  // Precondition: abstractNode is a child of this
  var n = abstractNode
  var prev = n._prevSibling
  var next = n._nextSibling

  n._parent = null
  n._prevSibling = null
  n._nextSibling = null

  if (prev) {
    prev._nextSibling = next // null next is ok
  }
  if (next) {
    next._prevSibling = prev // null prev is ok
  }

  delete this._children[n.id]
  this._order.splice(this._order.indexOf(n), 1)
}

module.exports = AbstractNode
