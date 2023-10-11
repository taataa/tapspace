const fine = require('affineplane')
const point3 = fine.point3
const vec3 = fine.vec3
const plane3 = fine.plane3

module.exports = function (point) {
  // @Transformer:translateTo(point)
  //
  // Translate the element along x-, y-, and z-axis so that its anchor
  // matches the given point.
  // Translation does not rotate or scale the element.
  // Translation along z-axis can change the perceived size of the element
  // depending on the viewport projection mode.
  //
  // Parameters
  //   point
  //     a Point
  //
  // Return
  //   this, for chaining
  //

  // Debug
  if (!point) {
    throw new Error('Invalid point')
  }
  // Normalize
  if (point.transitRaw) {
    point = point.transitRaw(this)
  }
  // Allow 2D point
  if (!point.z) {
    point.z = 0
  }

  const trip = point3.diff(this.anchor, point)
  // The trip vector is represented on the plane.
  // We need to represent it on the parent.
  const tripOnParent = vec3.transitFrom(trip, this.tran)
  // Apply the vector
  this.tran = plane3.translateBy(this.tran, tripOnParent)
  // Render
  this.renderTransform()

  return this
}
