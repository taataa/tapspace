module.exports = function (source, pivot) {
  // @Frame:resizeToMatchHeight(source[, pivot])
  //
  // Resize this frame to the space height of the source component.
  // The width is kept intact thus the aspect ratio may change.
  // The resize is performed about a fixed pivot point.
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
  const thisSize = this.getSize().getRaw()

  this.resize({ w: thisSize.w, h: srcHeight }, pivot)

  return this
}
