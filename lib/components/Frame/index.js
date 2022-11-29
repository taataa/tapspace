const Block = require('../Block')

const Frame = function (element) {
  // @Frame(element)
  //
  // Inherits Block
  //
  // Abstract class for rectangular affine components that can
  // change their size.
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //

  // TODO emit resized when the size changes? Against .resizable() events?

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }

  // Inherit
  Block.call(this, element)

  // Set class name
  element.classList.add('affine-frame')

  // In Tapspace v1, we bound to element resize event so that the size
  // variable values followed the actual size of the element.
  // In v2, we first thought that we do not need to listen events
  // because the size could be read directly from the element offsetWidth
  // and offsetHeight. However, offsetWidth and offsetHeight are not robust.
  // They become zero when the element is not connected to DOM.
  // Zero size makes it impossible to get the frame middle point, for example.
  // Therefore we need to have size defined here and rendered to CSS latently.
  const size = { width: 256, height: 256 }
  this.setSize(size)
  // TODO That also means we may need to listen for the element resize events,
  // TODO whenever needed. See MDN Resize Observer API
  // TODO Capture style width and height at init for the default size?
}

module.exports = Frame
const proto = Frame.prototype

// Inherit
Object.assign(proto, Block.prototype)

// Overriding methods
proto.atNorm = require('./atNorm')
proto.atToNorm = require('./atToNorm')
// TODO proto.getHull = require('./getHull')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.getHeight = require('./getHeight')

// Methods
// TODO proto.fitScale = require('./fitScale')
// TODO proto.fitShape = require('./fitShape')
// TODO proto.fitSize = require('./fitSize')
proto.matchPixelSize = require('./matchPixelSize')
proto.matchSize = require('./matchSize')
proto.resize = require('./resize')
proto.setSize = require('./setSize')
