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

  // TODO do we set styles here or is it the responsibility of the viewport?
  element.style.width = opts.size.width + 'px'
  element.style.height = opts.size.height + 'px'

  // TODO bind to element resize
  // TODO do we need to bind to element resize anymore?
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

// TODO proto.fitScale
// TODO proto.fitSize
// TODO proto.getHull

proto.getSize = require('./getSize')

// TODO proto.setSize
