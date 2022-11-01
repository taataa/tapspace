const geom = require('affineplane')

module.exports = function (transform) {
  // tapspace.components.AbstractPlane:transformBy(tran)
  //
  // Transform (move) the plane in space.
  // For example, let `rotate90` be a Transform that rotates the element
  // 90 degrees clockwise. The rotation is performed around the plane anchor.
  // If the plane was already at the angle of 45 degrees, then after
  // the transformation, the plane is at the angle of 135 degrees.
  //
  // Parameters
  //   transform
  //     a Transform
  //
  // Return
  //   this, for chaining
  //

  // Normalize the transform here.
  // Allow non-affine parent.
  if (transform.transitPlain) {
    transform = transform.transitPlain(this)
  }
  // Now the transform is on the plane.

  // Move
  this.tran = geom.plane3.compose(this.tran, transform)

  this.renderTransform()

  return this
}
