const fine = require('affineplane')
const helm3 = fine.helm3
const plane3 = fine.plane3

module.exports = function (tr) {
  // tapspace.components.AbstractView:transformBy(tr)
  //
  // Overwrites AbstractPlane:transformBy
  //
  // Transform the viewport in relation to the root bases. In effect, this
  // transforms all root bases with the inversion of the transform.
  //
  // Parameters:
  //   tr
  //     a Transform
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view and helm3
  if (tr.changeBasis) {
    tr = tr.changeBasis(this).helm
  }

  const planes = this.space.getChildren()

  // We have to invert the transform because of the viewport illusion.
  // The viewport does not move relative to the page.
  // Instead, the content of the viewport moves in inverted manner.
  // For example, the illusion of the viewport moving right in space
  // is achieved by moving the space left.
  const itr = helm3.invert(tr)

  // Transform each root basis silently.
  // Basis transitions denote a mapping from the basis to the viewport coords.
  // Viewport is transformed.
  for (let i = 0; i < planes.length; i += 1) {
    const plane = planes[i]
    plane.tran = plane3.transform(plane.tran, itr)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].renderTransform()
  }

  return this
}
