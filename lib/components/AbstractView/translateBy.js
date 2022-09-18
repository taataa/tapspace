const geom = require('affineplane')

module.exports = function (translation) {
  // tapspace.components.AbstractView:translateBy(translation, opts)
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
  if (translation.changeBasis) {
    translation = translation.changeBasis(this)
  }

  // We are translating the viewport in space, and
  // therefore the planes must move to opposite direction.
  const itranslation = geom.vec3.negate(translation)

  const planes = this.space.getChildren()
  const planesLen = planes.length

  // Translate each plane silently.
  for (let i = 0; i < planesLen; i += 1) {
    const plane = planes[i]
    plane.tran = geom.plane3.translateBy(plane.tran, itranslation)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planesLen; i += 1) {
    planes[i].renderTransform()
  }

  return this
}
