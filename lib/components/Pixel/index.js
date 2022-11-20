const AbstractFrame = require('../AbstractFrame')

const AffinePixel = function (color) {
  // tapspace.components.Pixel(color)
  //
  // Inherits tapspace.components.AbstractFrame
  //
  // Instance class for a 1x1 pixel on affine plane.
  //
  // Parameters:
  //   color
  //     a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
  //

  // Create a new element.
  const element = document.createElement('div')
  // Pixel does not have its own class, cuz is not part of tapspace core.
  element.className = 'affine-element'
  // Set given color
  element.style.backgroundColor = color

  AbstractFrame.call(this, element)
  this.setSize({ w: 1, h: 1 })
}

// Inherit from AbstractFrame
const proto = AffinePixel.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AffinePixel

// TODO prevent resize
