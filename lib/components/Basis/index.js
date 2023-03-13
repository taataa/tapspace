const emitter = require('component-emitter')

const Basis = function (element) {
  // @Basis(element)
  //
  // Inherits Emitter
  //
  // Basis is an abstract class for all affine components that have
  // an HTML element and a position within a Space.
  // Multiple bases together form an *affine subtree* in DOM.
  //
  // Parameters:
  //   element
  //     an HTMLElement
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
proto.isBasis = true

// Inherit
emitter(proto)

// Functions
Basis.findAffineAncestor = require('./dom/findAffineAncestor')
Basis.isAffine = require('./dom/isAffine')

// Methods
proto.addChild = require('./addChild')
proto.addClass = require('./addClass')
proto.appendChild = proto.addChild
// DANGER proto.appendTo // too easy 4 dev to mix w/ appendChild
proto.at = require('./at')
// DANGER proto.copy // very complex, little benefit
// TODO proto.bringAbove?
// TODO proto.bringToFront?
// TODO proto.getFirstChild
// TODO proto.getLastChild
// TODO proto.getNextSibling
// TODO proto.getPreviousSibling
proto.findCommonAncestor = require('./findCommonAncestor')
proto.getAncestors = require('./getAncestors')
proto.getChildren = require('./getChildren')
proto.getDescendants = require('./getDescendants')
proto.getElement = require('./getElement')
proto.getLeaves = require('./getLeaves')
proto.getOrientation = require('./getOrientation')
proto.getParent = require('./getParent')
proto.getPoint = proto.at
proto.getRoot = require('./getRoot')
proto.getTransitionFrom = require('./getTransitionFrom')
proto.getTransitionTo = require('./getTransitionTo')
proto.getTransitionToParent = require('./getTransitionToParent')
proto.getTransitionToParentOf = require('./getTransitionToParentOf')
proto.getVector = require('./getVector')
proto.getViewport = require('./getViewport')
// TODO proto.hasChild
// TODO proto.hasDescendant
proto.isLeaf = require('./isLeaf')
proto.isPlanar = require('./isPlanar')
proto.isRoot = require('./isRoot')
proto.prependChild = require('./prependChild')
proto.remove = require('./remove')
proto.removeChild = require('./removeChild')
proto.removeClass = require('./removeClass')
proto.replaceChild = require('./replaceChild')
proto.replaceParent = require('./replaceParent')
// TODO proto.sendBelow
// TODO proto.sendToBack
proto.setId = require('./setId')
proto.setParent = require('./setParent')
