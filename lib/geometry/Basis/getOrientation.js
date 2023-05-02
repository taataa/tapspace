const fine = require('affineplane')
const plane3 = fine.plane3
const Orientation = require('../../geometry/Orientation')

module.exports = function () {
  // @Basis:getOrientation()
  //
  // Get the orientation of this virtual basis.
  // Provides a way to match the orientation between components and geometry.
  //
  // Example:
  // ```
  // > const orient = item.getBasis().rotateByDegrees(45).getOrientation()
  // > anotherItem.setOrientation(orient)
  // ```
  //
  // Return
  //   an Orientation
  //
  const orient = plane3.orientation(this.tran)
  return new Orientation(this.basis, orient)
}
