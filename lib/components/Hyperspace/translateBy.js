const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (translation) {
  // @Hyperspace:translateBy(translation)
  //
  // Translate the hyperspace in relation to the viewport
  // along x, y, and z axis.
  //
  // Parameters
  //   translation
  //     a Vector or vec2 or vec3
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (translation.transitRaw) {
    translation = translation.transitRaw(this)
  }

  // Update transition matrix
  this.tran = plane3.translateBy(this.tran, translation)
  // Update css transform
  this.renderTransform()

  return this
}
