// A colorful circle.
// Useful for debugging coordinate positions.
//
const AbstractFrame = require('../AbstractFrame')

const AffineCircle = function (radius, color, opts) {
  // Instance class for a point on an affine plane.
  //
  // Parameters:
  //   radius
  //     a number.
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
  let className = 'affine-element affine-circle'
  if (opts.className) {
    className = className + ' ' + opts.className
  }
  element.className = className

  // Set given color
  element.style.backgroundColor = color
  // Set border radius to create the circle shape.
  element.style.borderRadius = radius + 'px'

  // Default anchor
  // We should not let parent classes handle default values
  // because we must set anchor key even when value nullish.
  if (!opts.anchor) {
    opts.anchor = { x: radius, y: radius }
  }

  AbstractFrame.call(this, element, {
    anchor: opts.anchor,
    size: { w: radius * 2, h: radius * 2 }
  })
}

// Inherit from AbstractFrame
const proto = AffineCircle.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AffineCircle
