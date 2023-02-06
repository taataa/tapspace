const fine = require('affineplane')
const box3 = fine.box3

module.exports = (Box) => {
  return function (basis, boxes) {
    // @Box:fromBoxes(basis, boxes)
    //
    // Find the bounding box for the given set of boxes.
    // The bounding box has the orientation of the given basis.
    //
    // Parameters:
    //   basis
    //     a Basis for the box
    //   boxes
    //     array of Box
    //
    // Return:
    //   a Box
    //

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
