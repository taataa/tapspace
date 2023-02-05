module.exports = function (source, pivot) {
  // @Frame:scaleToMatchWidth(source[, pivot])
  //
  // Scale this frame to the width of the source component.
  // The frame is not resized, only scaled.
  // The scaling is performed about a pivot point.
  //
  // Parameters:
  //   source
  //     a Block, a component that has size
  //   pivot
  //     optional Point, defaults to the transform origin (=anchor)
  //
  // Return
  //   this, for chaining
  //

  // Get current widths (in Distance)
  const srcWidth = source.getWidth().transitRaw(this)
  const thisWidth = this.getWidth().getRaw()

  // How to multiply our width to match the source?
  //   x * thisWidth = srcWidth
  const scaleFactor = srcWidth / thisWidth

  this.scaleBy(scaleFactor, pivot)

  return this
}
