module.exports = function (width, pivot) {
  // @Frame:scaleToWidth(width[, pivot])
  //
  // Scale this frame to the given width and maintain aspect ratio.
  // The frame is not resized, only scaled.
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

  // How to multiply our width to match the source?
  //   x * our width = given width
  const scaleFactor = width / this.size.w

  this.scaleBy(scaleFactor, pivot)

  return this
}
