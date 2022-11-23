const plane3 = require('affineplane').plane3

const makePassive = (tr, basis, center) => {
  // Correction for transform origin.
  // Convert active transformation to passive.
  // Gives the tr a position on the basis.
  //
  // Parameters:
  //   tr
  //     a helm2z
  //   basis
  //     a Plane
  //   center
  //     a Point
  //
  // Return
  //   a helm2z
  //

  // Normalize the center on the basis
  if (center.transitRaw) {
    center = center.transitRaw(basis)
  }

  const cx = center.x
  const cy = center.y
  const g = { a: 1, b: 0, x: cx, y: cy, z: 0 }
  const ig = { a: 1, b: 0, x: -cx, y: -cy, z: 0 }
  const trPassive = plane3.compose(g, plane3.compose(tr, ig))

  return trPassive
}

module.exports = function (tr, center) {
  // tapspace.components.Space:transformBy(tr, center)
  //
  // Use to navigate the space.
  // Transform the root bases in relation to the viewport. In effect, this
  // transforms the immediate children of the space.
  // The transition from space to viewport stays identity and intact.
  //
  // Parameters:
  //   tr
  //     a Transform
  //   center
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

  // If no center set, use origin.
  // We cannot apply tr without a center point.
  if (!center) {
    center = this.at(0, 0)
  }

  // Transform the children, not the space itself.
  const bases = this.getChildren()

  // Transform each child basis silently.
  // This looks like the space is transformed or that viewport
  // is inversely transformed.
  for (let i = 0; i < bases.length; i += 1) {
    const plane = bases[i]
    const trPassive = makePassive(tr, plane, center)
    plane.tran = plane3.compose(trPassive, plane.tran)
    // Rounding to integer pixel? No, cuz slow pan would become quite random.
  }

  // Update bases' CSS transform
  for (let i = 0; i < bases.length; i += 1) {
    bases[i].renderTransform()
  }

  return this
}
