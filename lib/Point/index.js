const projectionBetween = require('../dom/projectionBetween')
const proj = require('../geom/proj')
const Distance = require('../Distance')

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

proto.distanceTo = function (p) {
  // Distance between points.
  //
  // Parameters:
  //   p
  //     Point, another point
  //
  // Return
  //   Distance
  //
  const pr = projectionBetween(p.basis, this.basis)
  const pHere = proj.point2(pr, p)
  const dx = pHere.x - this.x
  const dy = pHere.y - this.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  return new Distance(this.basis, dist)
}

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = projectionBetween(this.basis, newBasis)
  const xy = proj.point2(pr, this)
  return new Point(newBasis, xy.x, xy.y)
}

module.exports = Point
