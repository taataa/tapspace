module.exports = function (source, pivot) {
  // @Frame:resizeToMatchWidth(source[, pivot])
  //
  // Resize this frame to the space width of the source component.
  // The height is kept intact thus the aspect ratio may change.
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

  // Get current widths (in Distance)
  const srcWidth = source.getWidth().transitRaw(this)
  const thisSize = this.getSize().getRaw()

  this.resize({ w: srcWidth, h: thisSize.h }, pivot)

  return this
}
