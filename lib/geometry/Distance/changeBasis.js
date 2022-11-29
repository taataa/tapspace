const dist3 = require('affineplane').dist3

module.exports = function (newBasis) {
  // tapspace.geometry.Distance:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Distance
  //
  const tr = this.basis.getTransitionTo(newBasis)
  const td = dist3.transitFrom(this.dist, tr)
  const Distance = this.constructor
  return new Distance(newBasis, td)
}
