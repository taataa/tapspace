module.exports = function (source, pivot) {
  // @Frame:scaleToMatchHeight(source[, pivot])
  //
  // Scale this frame to the height of the source component.
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

  // Get current heights (in Distance)
  const srcHeight = source.getHeight().transitRaw(this)
  const thisHeight = this.getHeight().getRaw()

  // How to multiply our height to match the source?
  //   x * thisHeight = srcHeight
  const scaleFactor = srcHeight / thisHeight

  this.scaleBy(scaleFactor, pivot)

  return this
}
