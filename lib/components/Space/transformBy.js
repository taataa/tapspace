const plane3 = require('affineplane').plane3

module.exports = function (tr) {
  // tapspace.components.Space:transformBy(tran)
  //
  // Transform the root bases in relation to the viewport. In effect, this
  // transforms the immediate children of the space.
  // The transition from space to viewport stays identity and intact.
  // Use this to navigate the space.
  //
  // Parameters:
  //   tran
  //     a Transform
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view=space
  if (tr.transitRaw) {
    tr = tr.transitRaw(this)
  }

  const bases = this.getChildren()

  // Transform each plane silently.
  // Plane transitions contain transition to the space.
  // It looks like the space is transformed or that viewport
  // is inversely transformed.
  for (let i = 0; i < bases.length; i += 1) {
    const plane = bases[i]
    plane.tran = plane3.transform(plane.tran, tr)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update bases' CSS transform
  for (let i = 0; i < bases.length; i += 1) {
    bases[i].renderTransform()
  }

  return this
}
