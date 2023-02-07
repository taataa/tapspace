module.exports = function (height, pivot) {
  // @Block:scaleToHeight(height[, pivot])
  //
  // Scale this block to the given height and maintain the aspect ratio.
  // The block is not resized, only its basis scaled.
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

  const blockSize = this.getSize().size

  // How to multiply our height to match the source?
  //   x * our height = given height
  const scaleFactor = height / blockSize.h

  this.scaleBy(scaleFactor, pivot)

  return this
}
