const emitter = require('component-emitter')

const AbstractNode = function (element) {
  // tapspace.components.AbstractNode(element)
  //
  // Abstract class for all affine components that have a HTML element.
  // AbstractNodes form an affine subtree in DOM.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }
  // TODO check that given element is not already affine

  // Set up a way to access element's affine properties outside.
  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  element.affine = this

  // The DOM element
  this.element = element
}

module.exports = AbstractNode

// Inherit from Emitter
const proto = AbstractNode.prototype
emitter(proto)

// Functions

AbstractNode.findAffineAncestor = require('./findAffineAncestor')

// Methods

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

// proto.off // TODO
// proto.on // TODO
