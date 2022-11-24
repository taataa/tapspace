const point3 = require('affineplane').point3
const Point = require('../../geometry/Point')

module.exports = function () {
  // @Plane:getPosition()
  //
  // Get the position of the plane anchor, represented on the parent.
  // The main difference between getPosition and atAnchor is that getPosition
  // will return null if the plane has no parent.
  //
  // Return
  //   a Point or null if no parent.
  //

  const par = this.getParent()

  if (par) {
    const pos = point3.transitFrom(this.anchor, this.tran)
    return new Point(par, pos)
  }

  return null
}
