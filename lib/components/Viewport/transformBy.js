const fine = require('affineplane')
const helm3 = fine.helm3

module.exports = function (tr, origin) {
  // @Viewport:transformBy(tr, origin)
  //
  // Overwrites Transformer:transformBy
  //
  // Transform the viewport in relation to the spaces. In effect, this
  // transforms hyperspace with the inversion of the transform.
  //
  // Parameters:
  //   tr
  //     a Transform
  //   origin
  //     optional Point, default is the viewport anchor. The transform origin.
  //     .. The scaling and rotation will be applied around this point.
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the hyperspace basis (!= viewport basis during animation)
  if (tr.transitRaw) {
    tr = tr.transitRaw(this.hyperspace)
  }

  // We have to invert the transform because of the viewport illusion.
  // The viewport does not move relative to the page.
  // Instead, the content of the viewport moves in inverted manner.
  // For example, the illusion of the viewport moving right in space
  // is achieved by moving the hyperspace left.
  const itr = helm3.invert(tr)

  this.hyperspace.transformBy(itr, origin)

  return this
}
