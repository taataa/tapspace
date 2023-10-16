const Box = require('../../geometry/Box')

module.exports = function (orientation) {
  // @Composite:getBoundingBox([orientation])
  //
  // Get bounding box of the children and their descendants.
  // Can be computationally heavy if there is lots of descendants.
  // You can specify custom orientation for the box.
  //
  // Optional basis determines the orientation of the box.
  //
  // Parameters:
  //   orientation
  //     optional Basis, Component, or Orientation. Default is this.
  //     The resulting box will have the same orientation.
  //
  // Return
  //   a Box
  //

  if (orientation && orientation.getOrientation) {
    // Is a basis or component, normalize.
    orientation = orientation.getOrientation()
  }

  const contents = this.getDescendants()
  const boxes = []

  // Avoid recursive bounding box computation because
  // rotations cause corners that will stack up and make
  // the boundary bigger than necessary.
  for (let i = 0; i < contents.length; i += 1) {
    if (contents[i].isBlockComponent) {
      const component = contents[i]
      // Orientation is allowed to be undefined.
      const box = component.getBoundingBox(orientation)
      boxes.push(box)
    }
  }

  if (orientation) {
    const orientedBasis = this.createBasis(this.at(0, 0), 1, orientation)
    const box = Box.fromBoxes(orientedBasis, boxes)
    return box.changeBasis(this)
  }

  return Box.fromBoxes(this, boxes)
}
