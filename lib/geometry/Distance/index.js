const geom = require('affineplane')

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

// proto.changeBasis =
proto.changeBasis = function (newBasis) {
  // tapspace.geometry.Distance:changeBasis(newBasis)
  //
  // Return
  //   a Distance
  //
  const tr = this.basis.getTransitionTo(newBasis)
  const td = geom.dist2.transitFrom(this.d, tr)
  return new Distance(newBasis, td)
}

// proto.multiply =
proto.scaleBy = function (multiplier) {
  // tapspace.geometry.Distance:scaleBy(multiplier)
  //
  // Multiply the distance. Returns new Distance.
  //
  // Parameters
  //   multiplier
  //     a number
  //
  // Return
  //   a Distance
  //
  return new Distance(this.basis, this.d * multiplier)
}

module.exports = Distance
