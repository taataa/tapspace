const projectionBetween = require('../Element/lib/projectionBetween')
const proj = require('../geom/proj')

const Point = function (basis, x, y) {
  // Parameters
  //   basis
  //     HTMLElement
  //   x
  //     number
  //   y
  //     number
  //
  this.basis = basis
  this.x = x
  this.y = y
}

const proto = Point.prototype

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = projectionBetween(this.basis, newBasis)
  const xy = proj.point2(pr, this)
  return new Point(newBasis, xy.x, xy.y)
}

module.exports = Point
