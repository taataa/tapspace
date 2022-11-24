const emitter = require('component-emitter')

const Basis = function (element) {
  // @Basis(element)
  //
  // Abstract class for all affine components that have a HTML element.
  // Multiple bases together form an affine subtree in DOM.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //

  // Debug
  if (!element) {
    throw new Error('Element does not exist.')
  }
  // Check that given element is not already affine.
  // If so, it is probably a programming error.
  if (element.affine) {
    throw new Error('Element is already affine.')
  }

  // Set up a way to access element's affine properties outside.
  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  element.affine = this

  // The DOM element
  this.element = element

  // The coordinate transition to the parent basis
  // is represented by an affine transformation matrix 'tran'.
  // - This transformation maps coordinates from the inner basis
  //   to the outer basis, 'outer' meaning the parent coordinates.
  // - The tran.x, .y and .z represent where the point (0,0,0) of
  //   the inner basis is positioned on the outer basis.
  // - The tran.a and .b define a linear transformation with
  //   uniform scaling and rotation.
  // - The node can have a transition even when it has no parent.
  //   That can be useful when we want to build the transition before
  //   inserting the node into the DOM.
  this.tran = { a: 1, b: 0, x: 0, y: 0, z: 0 }
}

module.exports = Basis
const proto = Basis.prototype

// Inherit from Emitter
emitter(proto)

// Methods
proto.add = require('./addChild')
proto.addChild = proto.add
proto.addClass = require('./addClass')
proto.copy = require('./copy')
proto.clone = proto.copy
// TODO proto.addChild? .appendChild .prependChild
// TODO proto.bringAbove?
// TODO proto.bringToFront?
proto.findCommonAncestor = require('./findCommonAncestor')
proto.getAncestors = require('./getAncestors')
proto.getChildren = require('./getChildren')
proto.getDescendants = require('./getDescendants')
proto.getElement = require('./getElement')
proto.getTransitionFrom = require('./getTransitionFrom')
proto.getTransitionTo = require('./getTransitionTo')
proto.getTransitionToParent = require('./getTransitionToParent')
proto.getTransitionToParentOf = require('./getTransitionToParentOf')
// TODO proto.getFirstChild
// TODO proto.getLastChild
// TODO proto.getNextSibling
// TODO proto.getPreviousSibling
proto.getLeaves = require('./getLeaves')
proto.getParent = require('./getParent')
proto.getRoot = require('./getRoot')
// TODO proto.hasChild
// TODO proto.hasDescendant
proto.isLeaf = require('./isLeaf')
proto.isRoot = require('./isRoot')
// TODO proto.remove
proto.removeClass = require('./removeClass')
// TODO proto.sendBelow
// TODO proto.sendToBack
proto.setParent = require('./setParent')
proto.appendTo = proto.setParent
