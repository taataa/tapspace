const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (size, origin) {
  // @Box:resizeTo(size, origin)
  //
  // Resize the box to given size by keeping the origin fixed.
  //
  // Parameters:
  //   size
  //     a Size, the new size
  //   origin
  //     a Point, the fixed pivot
  //
  // Return
  //   a Box, the translated box
  //

  // Normalize
  if (size.transitRaw) {
    size = size.transitRaw(this.basis)
  }
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const box = box3.resizeTo(this.box, origin, size.w, size.h, size.d)

  const Box = this.constructor
  return new Box(this.basis, box)
}
