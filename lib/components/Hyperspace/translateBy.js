const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (translation) {
  // @Hyperspace:translateBy(translation)
  //
  // Translate the spaces in relation to the viewport along x, y, and z axis.
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

  const spaces = this.getChildren()
  const spacesLen = spaces.length

  // Translate each space silently.
  for (let i = 0; i < spacesLen; i += 1) {
    const space = spaces[i]
    space.tran = plane3.translateBy(space.tran, translation)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update bases' CSS transform
  for (let i = 0; i < spacesLen; i += 1) {
    spaces[i].renderTransform()
  }

  return this
}
