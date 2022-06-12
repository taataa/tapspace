const AbstractFrame = require('../AbstractFrame')

const AffinePixel = function (color, opts) {
  // Instance class for a 1x1 pixel on affine plane.
  //
  // Parameters:
  //   color
  //     a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
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

  // Set given color
  element.style.backgroundColor = color

  // Default anchor
  // We should not let parent classes handle default values
  // because we must set anchor key even when value nullish.
  if (!opts.anchor) {
    opts.anchor = { x: 0, y: 0 }
  }

  AbstractFrame.call(this, element, {
    anchor: opts.anchor,
    size: { w: 1, h: 1 }
  })
}

// Inherit from AbstractFrame
const proto = AffinePixel.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AffinePixel
