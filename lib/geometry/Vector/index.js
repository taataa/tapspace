const Vector = function (basis, x, y, z) {
  // tapspace.geometry.Vector(basis, x, y, z)
  //
  // A vector that can be transited between planes.
  // The vector has length and direction but no position.
  //
  // Parameters
  //   basis
  //   x
  //     a number or a point2
  //   y
  //     a number
  //   z
  //     Optional number. Default 0.
  //
  this.basis = basis
  if (typeof x === 'object') {
    this.x = x.x
    this.y = x.y
    this.z = typeof x.z === 'number' ? x.z : 0
  } else {
    this.x = x
    this.y = y
    this.z = typeof z === 'number' ? z : 0
  }
}

module.exports = Vector
const proto = Vector.prototype

proto.changeBasis = require('./changeBasis')
