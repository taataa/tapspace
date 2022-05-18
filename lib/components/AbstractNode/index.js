
const AbstractNode = function (element) {
  // Abstract class for affine components that form a subtree in DOM.
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

const proto = AbstractNode.prototype
module.exports = AbstractNode

// TODO proto.addChild?
// TODO proto.bringAbove?
// TODO proto.bringToFront?

proto.findCommonAncestor = require('./findCommonAncestor')

proto.getAncestors = require('./getAncestors')
proto.getChildren = require('./getChildren')

// TODO proto.getDescendants
// TODO proto.getFirstChild
// TODO proto.getLastChild
// TODO proto.getNextSibling
// TODO proto.getPreviousSibling

proto.getParent = require('./getParent')
proto.getRoot = require('./getRoot')

// TODO proto.hasChild
// TODO proto.hasDescendant

proto.isRoot = require('./isRoot')

// TODO proto.remove
// TODO proto.sendBelow
// TODO proto.sendToBack
// TODO proto.setParent?

// proto.off // TODO
// proto.on // TODO
