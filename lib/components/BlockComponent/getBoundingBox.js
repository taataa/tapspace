const Box = require('../../geometry/Box')

module.exports = function () {
  // @BlockComponent:getBoundingBox()
  //
  // Get the bounding box of the block.
  //
  // Return:
  //   a Box
  //
  const size = this.getSize().getRaw()
  const box = { a: 1, b: 0, x: 0, y: 0, z: 0, w: size.w, h: size.h, d: 0 }

  return new Box(this, box)
}
