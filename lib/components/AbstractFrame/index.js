const AbstractPlane = require('../AbstractPlane')

const AbstractFrame = function (element, opts) {
  // tapspace.components.AbstractFrame(element, opts)
  //
  // Abstract class for rectangular affine components that can
  // change their size.
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //   opts
  //     anchor
  //       { x, y } on the element. Optional. Default {x:0, y:0}
  //     size
  //       { width, height } or { w, h }.
  //

  // TODO emit resized when the size changes?

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }

  // Inherit from AbstractPlane
  AbstractPlane.call(this, element, opts)

  // Default size
  opts = Object.assign({
    size: { width: 256, height: 256 }
  }, opts)
  // TODO capture style width and height at init for the default size?

  // In Tapspace v1, we bound to element resize event so that the size
  // variable values followed the actual size of the element.
  // In v2, we first thought that we do not need to listen events
  // because the size could be read directly from the element offsetWidth
  // and offsetHeight. However, offsetWidth and offsetHeight are not robust.
  // They become zero when the element is not connected to DOM.
  // Zero size makes it impossible to get the frame middle point, for example.
  // Therefore we need to have size defined here and rendered to CSS latently.
  // This also means we may need to listen for the element resize events,
  // whenever needed. See MDN Resize Observer API
  this.setSize(opts.size)
}

// Inherit from AbstractPlane
const proto = AbstractFrame.prototype
Object.assign(proto, AbstractPlane.prototype)
module.exports = AbstractFrame

proto.atNorm = require('./atNorm')
proto.atToNorm = require('./atToNorm')
proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = require('./atTopMid')
proto.atTopRight = require('./atTopRight')
proto.atMidLeft = require('./atMidLeft')
proto.atMidMid = require('./atMidMid')
proto.atMid = proto.atMidMid
proto.atMiddle = proto.atMidMid
proto.atCenter = proto.atMidMid
proto.atMidRight = require('./atMidRight')
proto.atBottomLeft = require('./atBottomLeft')
proto.atBottomMid = require('./atBottomMid')
proto.atBottomRight = require('./atBottomRight')

proto.matchPixelSize = require('./matchPixelSize')
proto.matchSize = require('./matchSize')
proto.moveCenterTo = require('./moveCenterTo')

// proto.fitScale = require('./fitScale')
// proto.fitSize = require('./fitSize')
proto.getHull = require('./getHull')

proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.getHeight = require('./getHeight')

proto.resize = require('./resize')
proto.setSize = require('./setSize')
