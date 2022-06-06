const AbstractFrame = require('../AbstractFrame')

const AffinePixel = function (content, opts) {
  // Instance class for a 1x1 pixel on affine plane.
  //
  // Parameters:
  //   color
  //     a string. A CSS color.
  //   opts, optional object
  //     id
  //       optional string. The id attribute of the element.
  //     className
  //       optional string. The class attribute of the element.
  //     anchor
  //       optional { x, y } on the element. Default {x:0,y:0}
  //

  if (!opts) {
    opts = {}
  }

  // Create a new element.
  const element = document.createElement('div')

  // Set id if applicable
  if (opts.id) {
    element.id = opts.id
  }

  // Set class name and handle className option
  let className = 'affine-element'
  if (opts.className) {
    className = className + ' ' + opts.className
  }
  element.className = className

  const size = { w: 1, h: 1 }

  // Set given color
  element.style.backgroundColor = color

  AbstractFrame.call(this, element, {
    anchor: opts.anchor,
    size: { w: 1, h: 1 }
  })
}

// Inherit from AbstractFrame
const proto = Object.assign({}, AbstractFrame.prototype)
AffinePixel.prototype = proto
module.exports = AffinePixel
