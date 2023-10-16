const fine = require('affineplane')
const plane3 = fine.plane3
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
    //     a Component or Basis for the box
    //   boxes
    //     array of Box
    //
    // Return:
    //   a Box
    //

    if (boxes.length === 0) {
      return new Box(basis, box3.ZERO)
    }

    // Normalize basis
    let component, transit
    if (basis.isComponent) {
      component = basis
      transit = plane3.IDENTITY
    } else if (basis.isBasis) {
      component = basis.basis
      transit = basis.tran
    } else {
      throw new Error('Invalid basis')
    }

    // Transit the boxes onto the component
    const bs = []
    for (let i = 0; i < boxes.length; i += 1) {
      const box = boxes[i]
      const boxOnComponent = box.transitRaw(component)
      const boxOnBasis = box3.transitTo(boxOnComponent, transit)
      bs.push(boxOnBasis)
    }

    // Compute bounds on basis and transit back to component.
    const bboxOnBasis = box3.getBounds(bs)
    const bboxOnComponent = box3.transitFrom(bboxOnBasis, transit)

    return new Box(component, bboxOnComponent)
  }
}
