const Box = require('../../geometry/Box')

module.exports = function (basis) {
  // @Space:getBoundingBox([basis])
  //
  // Get bounding box of the content in the space.
  // Optional basis determines the orientation of the box.
  //
  // Parameters:
  //   basis
  //     optional Basis, default to this. The resulting box will be
  //     in this basis and have the same orientation.
  //
  // Return
  //   a Box
  //

  if (!basis) {
    basis = this
  }

  const contents = this.getDescendants()
  const boxes = []

  // Avoid recursive bounding box computation because
  // rotations cause corners that will stack up and make
  // the boundary bigger than necessary.
  for (let i = 0; i < contents.length; i += 1) {
    if (contents[i].isBlock) {
      boxes.push(contents[i].getBoundingBox())
    }
  }

  return Box.fromBoxes(basis, boxes)
}