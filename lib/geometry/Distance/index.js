const proj2 = require('affineplane').proj2

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
proto.projectTo = function (newBasis) {
  // tapspace.geometry.Distance:projectTo(newBasis)
  //
  // Return
  //   a Distance
  //
  const pr = this.basis.getProjectionTo(newBasis)
  const pd = proj2.dist2(pr, this.d)
  return new Distance(newBasis, pd)
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
