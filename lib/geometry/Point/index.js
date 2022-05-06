const proj2 = require('affineplane').proj2
const projectionBetween = require('../../dom/projectionBetween')
const Distance = require('../Distance')

const Point = function (basis, x, y) {
  // Parameters
  //   basis
  //     a HTMLElement
  //   x
  //     a number
  //   y
  //     a number
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
  //     a Point, another point
  //
  // Return
  //   a Distance
  //
  const pr = projectionBetween(p.basis, this.basis)
  const pHere = proj2.point2(pr, p)
  const dx = pHere.x - this.x
  const dy = pHere.y - this.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  return new Distance(this.basis, dist)
}

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = projectionBetween(this.basis, newBasis)
  const xy = proj2.point2(pr, this)
  return new Point(newBasis, xy.x, xy.y)
}

module.exports = Point
