const fine = require('affineplane')
const point3 = fine.point3

module.exports = function (point) {
  // @Viewport:translateTo(point)
  // @Viewport:moveTo(point)
  //
  // Translate the viewport along x-, y-, and z-axis so that its anchor
  // matches the given point. Translation does not rotate or rescale the view.
  // Translation along z-axis can change the perceived size of space items
  // depending on the viewport projection mode.
  //
  // Parameters
  //   point
  //     a Point
  //
  // Return
  //   this, for chaining
  //

  // Normalize to hyperspace.
  if (point.transitRaw) {
    point = point.transitRaw(this.hyperspace)
  }
  // Allow 2D point
  if (!point.z) {
    point.z = 0
  }

  // We need to compute a trip vector.
  // Find viewport anchor on the hyperspace.
  const anchor = point3.transitTo(this.anchor, this.hyperspace.tran)

  // Get trip vector: moves viewport anchor to the given point.
  // Because viewport movement means inverted movement of hyperspace,
  // we get the inversion directly by swapping anchor and point roles.
  const itrip = point3.diff(point, anchor)

  // Apply
  this.hyperspace.translateBy(itrip)

  return this
}
