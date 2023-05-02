const fine = require('affineplane')
const plane3 = fine.plane3
const Distance = require('../../geometry/Distance')

module.exports = function (d) {
  // @Basis:createDistance(d)
  //
  // Get a distance on the virtual basis.
  //
  // Parameters:
  //   d
  //     a number, the distance represented in the virtual basis.
  //
  // Return
  //   a Distance
  //

  const m = plane3.getScale(this.tran)
  return new Distance(this.basis, m * d)
}
