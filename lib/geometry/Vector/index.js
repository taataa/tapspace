// A vector that can be projected between planes.
// The vector has length and direction but no position.
//

const Vector = function (basis, x, y) {
  // tapspace.geometry.Vector(basis, x, y)
  //
  // Parameters
  //   basis
  //   x
  //     a number or a point2
  //   y
  //     a number
  //
  this.basis = basis
  if (typeof x === 'object') {
    this.x = x.x
    this.y = x.y
  } else {
    this.x = x
    this.y = y
  }
}

module.exports = Vector
const proto = Vector.prototype

proto.projectTo = require('./projectTo')
