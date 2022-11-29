const Frame = require('../Frame')

const AffinePixel = function (color) {
  // tapspace.components.Pixel(color)
  //
  // Inherits Frame
  //
  // Instance class for a 1x1 pixel on affine plane.
  //
  // Parameters:
  //   color
  //     a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
  //

  // Create a new element.
  const element = document.createElement('div')

  // Set given color
  element.style.backgroundColor = color

  Frame.call(this, element)
  this.setSize({ w: 1, h: 1 })
}

// Inherit from Frame
const proto = AffinePixel.prototype
Object.assign(proto, Frame.prototype)
module.exports = AffinePixel

// TODO prevent resize
