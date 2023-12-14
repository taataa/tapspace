const fine = require('affineplane')
const box2 = fine.box2

module.exports = function () {
  // @Box:getInnerSquare()
  //
  // Get the largest square inside the box that has the same center point.
  // Useful for computing areas based on the shortest box dimension.
  //
  // Return:
  //   a Box
  //
  const Box = this.constructor
  const square = box2.getInnerSquare(this.box)
  // patch to box3
  square.z = 0
  square.d = 0
  return new Box(this.basis, square)
}
