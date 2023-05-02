const fine = require('affineplane')
const plane3 = fine.plane3
const Scale = require('../../geometry/Scale')

module.exports = function () {
  // @Basis:getScale()
  //
  // Get the scale of this virtual basis.
  // Provides a way to measure and match
  // the scale between components and geometry.
  //
  // Return
  //   a Scale
  //
  const scale = plane3.getScale(this.tran)
  return new Scale(this.basis, scale)
}
