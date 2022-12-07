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
  // Because viewport movement means inverted movement on the root planes,
  // we get the inversion directly by swapping anchor and point roles.
  const itrip = point3.diff(point, this.anchor)
  // We need to represent the trip on the parent of root planes.
  // The parent is a space, and the space basis equals to viewport basis.
  // This the trip is already on the correct basis.

  const planes = this.space.getChildren()
  const planesLen = planes.length

  // Translate each plane silently.
  for (let i = 0; i < planesLen; i += 1) {
    const plane = planes[i]
    plane.tran = plane3.translateBy(plane.tran, itrip)
    // Rounding to pixel? No, because slow pan would become random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planesLen; i += 1) {
    planes[i].renderTransform()
  }

  return this
}
