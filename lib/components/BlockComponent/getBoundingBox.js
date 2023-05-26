const Box = require('../../geometry/Box')
const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (basis) {
  // @BlockComponent:getBoundingBox([basis])
  //
  // Get the bounding box of the block.
  // If a custom basis is given, the box will have
  // the orientation of the basis.
  //
  // Parameters:
  //   optional Component. Default is this.
  //
  // Return:
  //   a Box
  //
  const size = this.getSize().getRaw()
  let box = { a: 1, b: 0, x: 0, y: 0, z: 0, w: size.w, h: size.h, d: 0 }

  if (basis) {
    const tran = this.getTransitionTo(basis)
    box = box3.transitFrom(box, tran)
    // Take bounding box that has same orientation as the basis.
    box = box3.getBounds(box)
  } else {
    basis = this
  }
  // box now on basis

  return new Box(basis, box)
}
