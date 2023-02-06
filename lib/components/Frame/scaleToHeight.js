module.exports = function (height, pivot) {
  // @Frame:scaleToHeight(height[, pivot])
  //
  // Scale this frame to the given height and maintain the aspect ratio.
  // The frame is not resized, only scaled.
  // The scaling is performed about a pivot point.
  //
  // Parameters:
  //   height
  //     a Distance, the new height in space.
  //   pivot
  //     optional Point, defaults to the transform origin (=anchor)
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (height.transitRaw) {
    height = height.transitRaw(this)
  }

  // How to multiply our height to match the source?
  //   x * our height = given height
  const scaleFactor = height / this.size.h

  this.scaleBy(scaleFactor, pivot)

  return this
}
