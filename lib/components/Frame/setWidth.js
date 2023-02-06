module.exports = function (width, pivot) {
  // @Frame:setWidth(width[, pivot])
  //
  // Resize this frame to the given width.
  // Keep height intact thus do not preserve the aspect ratio.
  // The resize is performed about a fixed pivot point.
  //
  // Parameters:
  //   width
  //     a Distance, the new width as a distance in space.
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

  this.resize({ w: width, h: this.size.h }, pivot)

  return this
}
