const proj2 = require('affineplane').proj2
const Distance = require('../Distance')

const Point = function (basis, x, y) {
  // Parameters
  //   basis
  //     a Component
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
  //     a Point or {x,y}. The latter is assumed to be on the same plane.
  //
  // Return
  //   a Distance
  //

  // Normalize
  if (p.basis) {
    const pr = p.basis.getProjectionTo(this.basis)
    p = proj2.point2(pr, p)
  }

  const dx = p.x - this.x
  const dy = p.y - this.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  return new Distance(this.basis, dist)
}

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = this.basis.getProjectionTo(newBasis)
  const xy = proj2.point2(pr, this)
  return new Point(newBasis, xy.x, xy.y)
}

module.exports = Point
