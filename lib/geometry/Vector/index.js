// A vector that can be projected between planes.
// The vector has length and direction but no position.
//

const Vector = function (basis, x, y) {
  this.basis = basis
  this.x = x
  this.y = y
}

module.exports = Vector
const proto = Vector.prototype

proto.projectTo = require('./projectTo')
