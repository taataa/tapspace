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
  // @Space:transformBy(tr, origin)
  //
  // Use this to navigate the space.
  // Transform the root bases in relation to the viewport. In effect, this
  // transforms the immediate children of the space.
  // The transition from space to viewport stays identity and intact.
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

  // Normalize onto the view basis (=space basis)
  if (tr.transitRaw) {
    tr = tr.transitRaw(this)
  }
  // Now the transform is on the view basis.

  // If no origin set, use virtual space origin.
  // We cannot apply tr without an origin point.
  if (!origin) {
    origin = { x: 0, y: 0, z: 0 }
  }
  // We compose the transform from the left, and
  // therefore we need to make it passive about the origin
  // relative to the outer basis, being the space.
  if (origin.transitRaw) {
    origin = origin.transitRaw(this)
  }
  const trPassive = makePassive(tr, origin)

  // Transform the children, not the space itself.
  const bases = this.getChildren()

  // Transform each child basis silently.
  // This looks like the space is transformed or that viewport
  // is inversely transformed.
  for (let i = 0; i < bases.length; i += 1) {
    const plane = bases[i]
    plane.tran = plane3.compose(trPassive, plane.tran)
    // Rounding to integer pixel? No, cuz slow pan would become quite random.
  }

  // Update bases' CSS transform
  for (let i = 0; i < bases.length; i += 1) {
    bases[i].renderTransform()
  }

  return this
}
