const AbstractPlane = require('../AbstractPlane')

const AbstractRectangle = function (element, opts) {
  // Abstract class for rectangular affine components
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //   opts
  //     gravity
  //       { x, y } on the element
  //     size
  //       { width, height }
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

  // Affine elements must have a size.
  // Copy to ensure immutability.
  this.size = Object.assign({}, opts.size)

  // TODO do we set styles here or is it the responsibility of the viewport?
  element.style.width = this.size.width + 'px'
  element.style.height = this.size.height + 'px'

  this.type = 'rectangle' // TODO do we need this?

  // TODO bind to element resize
  // TODO do we need to bind to element resize anymore?
}

// Inherit from AbstractPlane
const proto = Object.assign({}, AbstractPlane.prototype)
AbstractRectangle.prototype = proto
module.exports = AbstractRectangle

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

proto.getSize = require('./getSize')
