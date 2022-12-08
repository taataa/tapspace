const Frame = require('../Frame')
const Interactive = require('../Interactive')

const Circle = function (radius, color) {
  // @Circle(radius, color)
  //
  // Inherits Frame
  //
  // A colorful circle.
  // Instance class for a circle-like object on an affine plane.
  // Useful for debugging coordinate positions.
  //
  // Parameters:
  //   radius
  //     a number.
  //   color
  //     optional string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
  //     Leave undefined if you want to control the color via CSS classes.
  //

  // Create a new element.
  const element = document.createElement('div')

  // Set given color if any
  if (color) {
    element.style.backgroundColor = color
  }
  // Set border radius to create the circle shape.
  element.style.borderRadius = radius + 'px'

  Frame.call(this, element)
  Interactive.call(this)

  // Set class name
  element.classList.add('affine-circle')

  this.setAnchor({ x: radius, y: radius, z: 0 })
  this.setSize({ w: radius * 2, h: radius * 2 })
}

module.exports = Circle
const proto = Circle.prototype

// Inherit
Object.assign(proto, Frame.prototype)
Object.assign(proto, Interactive.prototype)

// Functions
Circle.create = require('./create')(Circle)
