const AbstractPlane = require('../AbstractPlane')

const AbstractFrame = function (element, opts) {
  // Abstract class for rectangular affine components
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //   opts
  //     anchor
  //       { x, y } on the element. Optional. Default {x:0, y:0}
  //     size
  //       { width, height } or { w, h }
  //

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
  // TODO capture style width and height at init.

  // Normalise size format { w, h }
  if ('w' in opts.size) {
    const wh = opts.size
    opts.size = {
      width: wh.w,
      height: wh.h
    }
  }

  // Set the element size.
  const width = opts.size.width
  const height = opts.size.height

  if (typeof width === 'string') {
    element.style.width = width
  } else if (typeof width === 'number') {
    element.style.width = width + 'px'
  } else {
    throw new Error('Invalid width: ' + width)
  }

  if (typeof height === 'string') {
    element.style.height = height
  } else if (typeof height === 'number') {
    element.style.height = height + 'px'
  } else {
    throw new Error('Invalid height: ' + height)
  }

  // In Tapspace v1, we bound to element resize event so that the size
  // variable values followed the actual size of the element.
  // In v2 we do not need to do that because the size is read directly
  // from the element offsetWidth and offsetHeight.
  // TODO do we still need to listen the resize event so that we can
  // TODO center the viewport when the page size changes?
}

// Inherit from AbstractPlane
const proto = AbstractFrame.prototype
Object.assign(proto, AbstractPlane.prototype)
module.exports = AbstractFrame

proto.atNorm = require('./atNorm')
proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = require('./atTopMid')
proto.atTopRight = require('./atTopRight')
proto.atMidLeft = require('./atMidLeft')
proto.atMidMid = require('./atMidMid')
proto.atMid = proto.atMidMid
proto.atCenter = proto.atMidMid
proto.atMidRight = require('./atMidRight')
proto.atBottomLeft = require('./atBottomLeft')
proto.atBottomMid = require('./atBottomMid')
proto.atBottomRight = require('./atBottomRight')

proto.centerTo = require('./centerTo')

// TODO proto.fitScale
// TODO proto.fitSize
// TODO proto.getHull

proto.getSize = require('./getSize')

// TODO proto.setSize
