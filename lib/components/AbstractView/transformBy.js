const fine = require('affineplane')
const helm3 = fine.helm3

module.exports = function (tr, center) {
  // tapspace.components.AbstractView:transformBy(tr, center)
  //
  // Overwrites AbstractPlane:transformBy
  //
  // Transform the viewport in relation to the root bases. In effect, this
  // transforms all root bases with the inversion of the transform.
  //
  // Parameters:
  //   tr
  //     a Transform
  //   center
  //     optional Point, default is anchor. The transform origin.
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

  // We have to invert the transform because of the viewport illusion.
  // The viewport does not move relative to the page.
  // Instead, the content of the viewport moves in inverted manner.
  // For example, the illusion of the viewport moving right in space
  // is achieved by moving the space left.
  const itr = helm3.invert(tr)

  this.space.transformBy(itr, center)

  return this
}
