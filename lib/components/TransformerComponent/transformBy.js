const plane3 = require('affineplane').plane3

module.exports = function (tr, origin) {
  // @TransformerComponent:transformBy(tr, origin)
  //
  // Transform (move) the basis in space.
  // For example, imagine a transform that rotates the basis
  // 90 degrees clockwise around z axis of the transformer anchor.
  // If the basis was already at the angle of 45 degrees, then after
  // the transformation, the basis is at the angle of 135 degrees.
  //
  // Parameters
  //   tr
  //     a Transform
  //   origin
  //     optional Point, default to transformer anchor. The transform origin.
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
  // Now the transform is in the basis.

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
