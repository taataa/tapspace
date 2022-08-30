const geom = require('affineplane')

module.exports = function (transform, opts) {
  // tapspace.components.AbstractPlane:transformBy(tran, opts)
  //
  // Transform (move) the element in space.
  //
  // Parameters
  //   transform
  //     a Transform
  //   opts
  //     TODO something?
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
  this.plane = geom.plane3.transform(this.plane, transform)

  this.renderTransform(opts)

  return this
}
