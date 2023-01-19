const fine = require('affineplane')
const vec3 = fine.vec3
const plane3 = fine.plane3

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

  // Normalize
  if (translation.transitRaw) {
    translation = translation.transitRaw(this)
  }

  // We are translating the viewport in space, and
  // therefore the planes must move to opposite direction.
  const itranslation = vec3.negate(translation)

  const spaces = this.hyperspace.getChildren()
  const spacesLen = spaces.length

  // Translate each space silently.
  for (let i = 0; i < spacesLen; i += 1) {
    const space = spaces[i]
    space.tran = plane3.translateBy(space.tran, itranslation)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < spacesLen; i += 1) {
    spaces[i].renderTransform()
  }

  return this
}
