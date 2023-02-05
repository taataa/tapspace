module.exports = function (source, pivot) {
  // @Frame:resizeToMatchSize(source[, pivot])
  //
  // Resize this frame to the space size of the source component.
  // The aspect ratio will change to match the source.
  // The pixel size is matched only if the source has the same scale.
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

  // Get current sizes (in Distance)
  const srcSize = source.getSize().transitRaw(this)

  this.resize(srcSize, pivot)

  return this
}
