const plane3 = require('affineplane').plane3

module.exports = function (tr) {
  // tapspace.components.AbstractPlane:transformBy(tr)
  //
  // Transform (move) the plane in space.
  // For example, let `rotate90` be a Transform that rotates the element
  // 90 degrees clockwise. The rotation is performed around the plane anchor.
  // If the plane was already at the angle of 45 degrees, then after
  // the transformation, the plane is at the angle of 135 degrees.
  //
  // Parameters
  //   tr
  //     a Transform
  //
  // Return
  //   this, for chaining
  //

  // Normalize the transform here.
  // Allow non-affine parent.
  if (tr.transitRaw) {
    tr = tr.transitRaw(this)
  }
  // Now the transform is on the plane.

  // Move
  this.tran = plane3.compose(this.tran, tr)

  this.renderTransform()

  return this
}
