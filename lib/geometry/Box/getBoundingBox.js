const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (basis) {
  // @Box:getBoundingBox([basis])
  //
  // Get the boundary of the box. The boundary is another box
  // that has the same orientation as the given basis.
  //
  // Parameters:
  //   basis
  //     optional Component. Default is this.basis
  //
  // Return:
  //   a Box
  //

  let box = this.box
  if (basis) {
    const tran = this.basis.getTransitionTo(basis)
    box = box3.transitFrom(box, tran)
  } else {
    basis = this.basis
  }
  // box now on basis

  const boundingBox = box3.getBounds(box)

  const Box = this.constructor
  return new Box(basis, boundingBox)
}
