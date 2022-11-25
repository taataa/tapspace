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
  //     a Vector or vec2 or vec3
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

  const planes = this.space.getChildren()
  const planesLen = planes.length

  // Translate each plane silently.
  for (let i = 0; i < planesLen; i += 1) {
    const plane = planes[i]
    plane.tran = plane3.translateBy(plane.tran, itranslation)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planesLen; i += 1) {
    planes[i].renderTransform()
  }

  return this
}
