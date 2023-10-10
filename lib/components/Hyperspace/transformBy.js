const plane3 = require('affineplane').plane3

const makePassive = (tr, origin) => {
  // Correction for transform origin.
  // Convert active transformation to passive.
  // Gives the tr a position on the basis.
  //
  // Parameters:
  //   tr
  //     a helm2z
  //   origin
  //     a point2
  //
  // Return
  //   a helm2z
  //

  const cx = origin.x
  const cy = origin.y
  const g = { a: 1, b: 0, x: cx, y: cy, z: 0 }
  const ig = { a: 1, b: 0, x: -cx, y: -cy, z: 0 }
  const trPassive = plane3.compose(g, plane3.compose(tr, ig))

  return trPassive
}

module.exports = function (tr, origin) {
  // @Hyperspace:transformBy(tr, origin)
  //
  // Use this to navigate the spaces.
  // Transform the spaces in relation to the viewport. In effect, this
  // transforms the immediate children of the hyperspace.
  //
  // Currently, the transition from hyperspace to viewport stays at
  // the identity and intact. In future, the transformation methods of
  // hyperspace can choose whether to transform the spaces or the hyperspace
  // in order to bring numerical stability.
  //
  // Parameters:
  //   tr
  //     a Transform
  //   origin
  //     optional Point, default is (0,0). The transform origin.
  //     .. The scaling and rotation will be applied around this point.
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the hyperspace basis
  if (tr.transitRaw) {
    tr = tr.transitRaw(this)
  }
  // Now the transform is on the hyperspace.

  // If no origin set, use the floating origin of the hyperspace.
  // We cannot apply tr without an origin point.
  if (!origin) {
    origin = { x: 0, y: 0, z: 0 }
  }
  // We compose the transform from the left, and
  // therefore we need to make it passive about the origin
  // relative to the outer basis, being the hyperspace.
  if (origin.transitRaw) {
    origin = origin.transitRaw(this)
  }
  const trPassive = makePassive(tr, origin)
  // Update transition matrix
  this.tran = plane3.compose(trPassive, this.tran)
  // Update css transform
  this.renderTransform()

  return this
}
