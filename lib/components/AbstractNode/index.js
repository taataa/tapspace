
const AbstractPlane = function (element) {
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

  this.type = 'node' // Do we need type?
}

const proto = AbstractNode.prototype
module.exports = AbstractNode

proto.getAncestors = require('./getAncestors')
proto.getParent = require('./getParent')

proto.isAffineRoot = require('./isAffineRoot')

// proto.off // TODO
// proto.on // TODO
