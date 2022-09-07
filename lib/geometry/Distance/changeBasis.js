module.exports = function (newBasis) {
  // tapspace.geometry.Distance:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     an affine component
  //
  // Return
  //   a Distance
  //
  const tr = this.basis.getTransitionTo(newBasis)
  const td = geom.dist2.transitFrom(this.d, tr)
  const Distance = this.constructor
  return new Distance(newBasis, td)
}
