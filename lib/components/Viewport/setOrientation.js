module.exports = function (orient, pivot) {
  // @Viewport:setOrientation(orient[, pivot])
  //
  // Rotate the viewport so that its orientation matches the given orientation.
  // The rotation is performed around a pivot point.
  //
  // Parameters:
  //   orient
  //     an Orientation
  //   pivot
  //     optional Point, the transform origin for the rotation.
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (orient.transitRaw) {
    orient = orient.transitRaw(this)
  }

  // Get orientation offset
  const targetRot = Math.atan2(orient.b, orient.a)

  // Correct orientation
  this.rotateBy(-targetRot, pivot)

  return this
}
