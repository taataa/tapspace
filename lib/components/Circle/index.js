const AbstractFrame = require('../AbstractFrame')

const AffineCircle = function (radius, color) {
  // tapspace.components.Circle(radius, color)
  //
  // A colorful circle.
  // Instance class for a circle-like object on an affine plane.
  // Useful for debugging coordinate positions.
  //
  // Parameters:
  //   radius
  //     a number.
  //   color
  //     a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
  //

  // Create a new element.
  const element = document.createElement('div')

  // Set class name
  element.className = 'affine-element affine-circle'

  // Set given color
  element.style.backgroundColor = color
  // Set border radius to create the circle shape.
  element.style.borderRadius = radius + 'px'

  AbstractFrame.call(this, element)

  this.setAnchor({ x: radius, y: radius, z: 0 })
  this.setSize({ w: radius * 2, h: radius * 2 })
}

// Inherit from AbstractFrame
const proto = AffineCircle.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AffineCircle
