const geom = require('affineplane')

module.exports = function (transform) {
  // tapspace.components.AbstractPlane:transformBy(tran)
  //
  // Transform (move) the element in space.
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
  if (transform.basis) {
    const tran = transform.basis.getTransitionTo(this)
    transform = geom.helm3.transitFrom(transform, tran)
  }
  // Now the transform is on the plane.

  // Move
  this.tran = geom.plane3.compose(this.tran, transform)

  this.renderTransform()

  return this
}
