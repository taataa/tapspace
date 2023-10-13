const Box = require('../../geometry/Box')
const fine = require('affineplane')
const box2 = fine.box2

module.exports = function (orientation) {
  // @BlockComponent:getBoundingBox([orientation])
  //
  // Get the bounding box of the block.
  // To compute a bounding box that is not perpendicular to the block,
  // you can specify a custom orientation.
  //
  // Parameters:
  //   orientation
  //     optional Orientation. Default is the orientation of this block.
  //
  // Return:
  //   a Box
  //
  const size = this.getSize().getRaw()
  let box = { a: 1, b: 0, x: 0, y: 0, w: size.w, h: size.h }

  if (orientation) {
    // Support Basis
    if (orientation.getOrientation) {
      orientation = orientation.getOrientation()
    }
    // Normalize orientation
    if (orientation.transitRaw) {
      orientation = orientation.transitRaw(this)
    }

    // Construct oriented basis
    const tran = {
      a: orientation.a,
      b: orientation.b,
      x: 0,
      y: 0
    }
    // Represent the box in oriented basis.
    box = box2.transitTo(box, tran)
    // Take bounding box that has the orientation of the oriented basis.
    box = box2.getBounds(box)
    // Transit back to original basis.
    box = box2.transitFrom(box, tran)
  }

  // Patch to 3D
  // TODO revert back to 2D
  box.z = 0
  box.d = 0

  return new Box(this, box)
}
