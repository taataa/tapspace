const plane3 = require('affineplane').plane3

module.exports = function (tr, origin) {
  // @Plane:transformBy(tr, origin)
  //
  // Transform (move) the plane in space.
  // For example, imagine a transform that rotates the plane
  // 90 degrees clockwise around the plane anchor.
  // If the plane was already at the angle of 45 degrees, then after
  // the transformation, the plane is at the angle of 135 degrees.
  //
  // Parameters
  //   tr
  //     a Transform
  //   origin
  //     optional Point, default to plane anchor. The transform origin.
  //     .. The scaling and rotation will be applied around this point.
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

  // Normalize the origin if any.
  if (origin) {
    if (origin.transitRaw) {
      origin = origin.transitRaw(this)
    }
  } else {
    origin = this.anchor
  }

  // Give the transformation a location: make it a plane transition
  // by applying it to the origin.
  const cx = origin.x
  const cy = origin.y
  const g = { a: 1, b: 0, x: cx, y: cy, z: 0 }
  const ig = { a: 1, b: 0, x: -cx, y: -cy, z: 0 }
  const planeTr = plane3.compose(g, plane3.compose(tr, ig))
  // Move
  this.tran = plane3.compose(this.tran, planeTr)

  this.renderTransform()

  return this
}
