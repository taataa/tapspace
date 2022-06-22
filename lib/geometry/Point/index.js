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

proto.offset = function (dx, dy) {
  // Get a point when the current point is offset by dx and dy.
  //
  // Parameters:
  //   dx
  //     a number of pixels to move horizontally on the basis.
  //   dy
  //     a number of pixels to move vertically on the basis.
  //
  // Return
  //   a Point
  //
  return new Point(this.basis, this.x + dx, this.y + dy)
}

proto.plain = function () {
  // Return plain point2 object {x,y}
  //
  return {
    x: this.x,
    y: this.y
  }
}

proto.polarOffset = require('./polarOffset')

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = this.basis.getProjectionTo(newBasis)
  const xy = proj2.point2(pr, this)
  return new Point(newBasis, xy.x, xy.y)
}

proto.round = function () {
  // Round the point to nearest integers.
  //
  // Return
  //   a Point
  //
  return new Point(this.basis, Math.round(this.x), Math.round(this.y))
}

module.exports = Point
