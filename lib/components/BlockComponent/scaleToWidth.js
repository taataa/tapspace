module.exports = function (width, pivot) {
  // @BlockComponent:scaleToWidth(width[, pivot])
  //
  // Scale this block to the given width and maintain aspect ratio.
  // The block is not resized, only its basis scaled.
  // The scaling is performed about a pivot point.
  //
  // Parameters:
  //   width
  //     a Distance, the new width in space.
  //   pivot
  //     optional Point, defaults to the transform origin (=anchor)
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (width.transitRaw) {
    width = width.transitRaw(this)
  }

  const blockSize = this.getSize()

  // How to multiply our width to match the source?
  //   x * our width = given width
  const scaleFactor = width / blockSize.w

  this.scaleBy(scaleFactor, pivot)

  return this
}
