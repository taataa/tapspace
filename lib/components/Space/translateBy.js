const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (translation) {
  // @Space:translateBy(translation)
  //
  // Translate the space in relation to the viewport along x, y, and z axis.
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

  const bases = this.getChildren()
  const basesLen = bases.length

  // Translate each plane silently.
  for (let i = 0; i < basesLen; i += 1) {
    const basis = bases[i]
    basis.tran = plane3.translateBy(basis.tran, translation)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update bases' CSS transform
  for (let i = 0; i < basesLen; i += 1) {
    bases[i].renderTransform()
  }

  return this
}
