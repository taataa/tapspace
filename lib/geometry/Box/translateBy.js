const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (vec) {
  // @Box:translateBy(vec)
  //
  // Translate the box by a vector.
  //
  // Parameters:
  //   vec
  //     a Vector, the translation
  //
  // Return
  //   a Box, the translated box
  //

  // Normalize
  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  const tbox = box3.translateBy(this.box, vec.x, vec.y, vec.z)

  const Box = this.constructor
  return new Box(this.basis, tbox)
}
