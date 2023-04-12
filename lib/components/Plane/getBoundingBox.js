const Box = require('../../geometry/Box')

module.exports = function (basis) {
  // @Plane:getBoundingBox([basis])
  //
  // Get bounding box of the content on the plane.
  // Optional basis determines the orientation of the box.
  //
  // Parameters:
  //   basis
  //     optional BasisComponent, default to this. The resulting box will be
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
    if (contents[i].isBlockComponent) {
      boxes.push(contents[i].getBoundingBox())
    }
  }

  return Box.fromBoxes(basis, boxes)
}
