const fine = require('affineplane')
const point3 = fine.point3
const plane3 = fine.plane3

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

  // Normalize
  if (point.transitRaw) {
    point = point.transitRaw(this)
  }
  // Allow 2D point
  if (!point.z) {
    point.z = 0
  }

  // Get trip vector on the viewport: move viewport anchor to the given point.
  // Because viewport movement means inverted movement in the basis spaces,
  // we get the inversion directly by swapping anchor and point roles.
  const itrip = point3.diff(point, this.anchor)
  // We need to represent the trip on the parent of the basis spaces.
  // The parent is the hyperspace, and the hyperspace basis equals
  // the viewport basis (might change in future).
  // Thus the trip is already on the correct basis.

  const spaces = this.hyperspace.getChildren()
  const spacesLen = spaces.length

  // Translate each space silently.
  for (let i = 0; i < spacesLen; i += 1) {
    const space = spaces[i]
    space.tran = plane3.translateBy(space.tran, itrip)
    // Rounding to pixel? No, because slow pan would become random.
  }

  // Update spaces' CSS transform
  for (let i = 0; i < spacesLen; i += 1) {
    spaces[i].renderTransform()
  }

  return this
}
