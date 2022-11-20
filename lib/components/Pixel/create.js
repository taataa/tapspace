const Pixel = require('./index')

module.exports = (color) => {
  // tapspace.createPixel(color)
  // tapspace.pixel
  //
  // Create a Pixel component. The pixel is a 1x1 pixel on affine plane.
  //
  // Parameters: see tapspace.components.Pixel
  //
  // Return
  //   a tapspace.components.Pixel
  //
  return new Pixel(color)
}
