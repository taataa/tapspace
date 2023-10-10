const fine = require('affineplane')
const vec3 = fine.vec3

module.exports = function (translation) {
  // @Viewport:translateBy(translation, opts)
  //
  // Translate the viewport in space along x, y, and z axis.
  //
  // Parameters
  //   translation
  //     a Vector or vec2 or vec3 on the viewport.
  //
  // Return
  //   this, for chaining
  //

  // Normalize to hyperspace
  if (translation.transitRaw) {
    translation = translation.transitRaw(this.hyperspace)
  }
  // Allow 2D vector
  if (!translation.z) {
    translation.z = 0
  }

  // We are translating the viewport in space, and
  // therefore the hyperspace must move to opposite direction.
  const itranslation = vec3.negate(translation)
  // Round translation to pixel? No, because slow pan becomes very random.

  // Apply to hyperspace. Hyperspace deals with animation and idle event.
  this.hyperspace.translateBy(itranslation)

  return this
}
