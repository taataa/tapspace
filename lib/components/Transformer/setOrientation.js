const plane3 = require('affineplane').plane3

module.exports = function (orient, pivot) {
  // @Transformer:setOrientation(orient[, pivot])
  //
  // Rotate this basis so that its orientation matches the given orientation.
  // The rotation is performed around the given pivot point.
  // Use to match orientation between components.
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
  if (orient.transitRawOuter) {
    orient = orient.transitRawOuter(this)
  }

  // TODO use quaternions in 3D case
  const currentRot = Math.atan2(this.tran.b, this.tran.a)
  const targetRot = Math.atan2(orient.b, orient.a)

  // Think like: revert current rotation (-currentRot) and then apply.
  this.rotateBy(targetRot - currentRot, pivot)

  return this
}
