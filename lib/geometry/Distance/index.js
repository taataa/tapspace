const Distance = function (basis, d) {
  // tapspace.geometry.Distance(basis, d)
  //
  // Parameters
  //   basis
  //     a Component
  //   d
  //     number, a measure. Cannot be negative.
  //
  // Properties:
  //   basis
  //   d
  //
  this.basis = basis
  this.d = d
}

const proto = Distance.prototype

proto.changeBasis = require('./changeBasis')
proto.multiply = require('./scaleBy')
proto.scaleBy = proto.multiply

module.exports = Distance
