const fine = require('affineplane')
const box3 = fine.box3

module.exports = (Box) => {
  return function (basis, boxes) {
    // @Box:fromBoxes(basis, boxes)
    //
    // Find the bounding box for the given set of boxes.
    // The bounding box has the orientation of the given basis.
    // Empty array will return zero-size box at origin.
    //
    // Parameters:
    //   basis
    //     a BasisElement for the box
    //   boxes
    //     array of Box
    //
    // Return:
    //   a Box
    //

    if (boxes.length === 0) {
      // TODO box3.IDENTITY .UNIT .EMPTY .ZERO
      return new Box(basis, { a: 1, b: 0, x: 0, y: 0, z: 0, w: 0, h: 0, d: 0 })
    }

    // Transit the boxes onto the basis
    const bs = []
    for (let i = 0; i < boxes.length; i += 1) {
      const b = boxes[i]
      bs.push(b.transitRaw(basis))
    }

    const boundingBox = box3.getBounds(bs)

    return new Box(basis, boundingBox)
  }
}
