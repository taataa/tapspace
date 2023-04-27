const BlockComponent = require('../BlockComponent')

const FrameComponent = function (element) {
  // @FrameComponent(element)
  //
  // Inherits BlockComponent
  //
  // Abstract class for rectangular affine components that can
  // change their size.
  //
  // Parameters:
  //   element
  //     an HTMLElement. The element does not need to be in DOM.
  //

  // TODO emit resized when the size changes? Against .resizable() events?

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }

  // Inherit
  BlockComponent.call(this, element)

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
  // TODO That also means we may need to listen for the element resize events,
  // TODO whenever needed. See MDN Resize Observer API
  // TODO Capture style width and height at init for the default size?
  // Note that this.size is size3.
  const size = { width: 256, height: 256 }
  this.setSize(size)

  // Solid objects cannot be passed through.
  this.solid = false
}

module.exports = FrameComponent
const proto = FrameComponent.prototype
proto.isFrameComponent = true

// Inherit
Object.assign(proto, BlockComponent.prototype)

// Overriding methods
proto.atNorm = require('./atNorm')
// TODO proto.getHull = require('./getHull')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.getHeight = require('./getHeight')
proto.normAt = require('./normAt')
proto.getNormalizedPoint = proto.atNorm

// Methods
// TODO proto.fitScale = require('./fitScale')
// TODO proto.fitShape = require('./fitShape')
// TODO proto.fitSize = require('./fitSize')
proto.isSolid = require('./isSolid')
proto.matchPixelSize = require('./matchPixelSize')
proto.matchSize = require('./matchSize')
proto.resizeTo = require('./resizeTo')
proto.setHeight = require('./setHeight')
proto.setSize = require('./setSize')
proto.setSolidity = require('./setSolidity')
proto.setWidth = require('./setWidth')
