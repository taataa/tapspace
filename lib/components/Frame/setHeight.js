module.exports = function (height, pivot) {
  // @Frame:setHeight(height[, pivot])
  //
  // Resize this frame to the given height.
  // Keep width intact thus do not preserve the aspect ratio.
  // The resize is performed about a fixed pivot point.
  //
  // Parameters:
  //   height
  //     a Distance, the new height as a distance in space.
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

  this.resizeTo({ w: this.size.w, h: height }, pivot)

  return this
}
