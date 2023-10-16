const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (orientation) {
  // @Box:getBoundingBox([orientation])
  //
  // Get the boundary of the box. The boundary is another box
  // that has the given orientation.
  //
  // Parameters:
  //   orientation
  //     optional Basis, Component, or Orientation. Default is this.basis
  //
  // Return:
  //   a Box
  //
  const Box = this.constructor

  if (!orientation) {
    // Default just copy
    return new Box(this.basis, this.box)
  } else if (orientation.getOrientation) {
    // Is Basis or Component
    orientation = orientation.getOrientation()
  } else if (!orientation.isOrientation) {
    throw new Error('Invalid orientation: ' + orientation)
  }
  // Handle orientation.
  // Expose here
  const orient = orientation.transitRaw(this.basis)
  // Convert to basis
  const orientedBasis = Object.assign(orient, { x: 0, y: 0, z: 0 })
  // Map forth and back for properly oriented bbox.
  const orientedBox = box3.transitTo(this.box, orientedBasis)
  const boundingBox = box3.getBounds(orientedBox)
  const bbox = box3.transitFrom(boundingBox, orientedBasis)

  return new Box(this.basis, bbox)
}
