const Box = require('../../geometry/Box')

module.exports = function () {
  // @BlockComponent:getInnerSquare()
  //
  // Get the largest square box inside the block that has the same center.
  //
  // Return:
  //   a Box
  //
  const size = this.getSize().getRaw()
  const bw = size.w
  const bh = size.h
  const offset = Math.abs((bw - bh) / 2)

  let box
  if (bw > bh) {
    // width longer, height limits
    box = { a: 1, b: 0, x: offset, y: 0, z: 0, w: bh, h: bh, d: 0 }
  } else {
    // height longer, width limits
    box = { a: 1, b: 0, x: 0, y: offset, z: 0, w: bw, h: bw, d: 0 }
  }

  return new Box(this, box)
}
