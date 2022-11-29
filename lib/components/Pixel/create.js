const Pixel = require('./index')

module.exports = (color) => {
  // tapspace.createPixel(color)
  // Pixel.create
  //
  // Create a Pixel component. The pixel is a 1x1 pixel on affine plane.
  //
  // Parameters:
  //   color
  //     a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
  //
  // Return
  //   a Pixel
  //
  return new Pixel(color)
}
