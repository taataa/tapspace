const emitter = require('component-emitter')

const Component = function (element) {
  // @Component(element)
  //
  // Inherits Emitter
  //
  // Component is an abstract class for all space components.
  // Each component has an HTML element and a Basis position
  // relative to its parent component.
  // Nested components form an *affine subtree* in DOM.
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

  // Linked elements
  // TODO needed? Or bloat?
  this.links = {}

  // Track idle throttling status. See this.requestIdle.
  this.idleTimeout = null

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

module.exports = Component
const proto = Component.prototype
proto.isComponent = true

// Inherit
emitter(proto)

// Functions
Component.findAffineAncestor = require('./dom/findAffineAncestor')
Component.isAffine = require('./dom/isAffine')

// Methods
proto.addChild = require('./addChild')
proto.addClass = require('./addClass')
proto.addLink = require('./addLink')
proto.appendChild = proto.addChild
// DANGER proto.appendTo // too easy for devs to mix w/ appendChild
proto.at = require('./at')
proto.atAnchor = require('./atAnchor')
// DANGER proto.copy // very complex, little benefit
proto.bringAbove = require('./bringAbove')
proto.bringToFront = require('./bringToFront')
proto.createBasis = require('./createBasis')
proto.createPoint = proto.at
proto.createDirection = require('./createDirection')
proto.createDistance = require('./createDistance')
proto.createOrientation = require('./createOrientation')
proto.createVector = require('./createVector')
// TODO proto.getFirstChild
// TODO proto.getLastChild
// TODO proto.getSiblings
// TODO proto.getNextSibling
// TODO proto.getPreviousSibling
proto.findCommonAncestor = require('./findCommonAncestor')
proto.followLink = require('./followLink')
proto.getAncestors = require('./getAncestors')
proto.getBasis = require('./getBasis')
proto.getBasisAt = require('./getBasisAt') // TODO rename to createBasis
proto.getChildren = require('./getChildren')
proto.getDescendants = require('./getDescendants')
proto.getElement = require('./getElement')
proto.getLeaves = require('./getLeaves')
proto.getOrientation = require('./getOrientation')
proto.getParent = require('./getParent')
proto.getRoot = require('./getRoot')
proto.getScale = require('./getScale')
proto.getTransitionFrom = require('./getTransitionFrom')
proto.getTransitionTo = require('./getTransitionTo')
proto.getTransitionToParent = require('./getTransitionToParent')
proto.getTransitionToParentOf = require('./getTransitionToParentOf')
proto.getViewport = require('./getViewport')
proto.hasClass = require('./hasClass')
proto.hasLink = require('./hasLink')
// TODO proto.hasChild
// TODO proto.hasDescendant
proto.isLeaf = require('./isLeaf')
proto.isRoot = require('./isRoot')
proto.prependChild = require('./prependChild')
proto.remove = require('./remove')
proto.removeChild = require('./removeChild')
proto.removeClass = require('./removeClass')
proto.removeLink = require('./removeLink')
proto.removeLinks = require('./removeLinks')
proto.replaceChild = require('./replaceChild')
proto.replaceParent = require('./replaceParent')
proto.requestIdle = require('./requestIdle')
proto.sendBelow = require('./sendBelow')
proto.sendToBack = require('./sendToBack')
proto.setId = require('./setId')
proto.setParent = require('./setParent')
proto.sortByDepth = require('./sortByDepth')
