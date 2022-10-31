const dist3 = require('affineplane').dist3

module.exports = function (newBasis) {
  // tapspace.geometry.Scale:changeBasis(newBasis)
  //
  // Represent the scale in another coordinate basis.
  //
  // Parameters:
  //   newBasis
  //     a component
  //
  // Return
  //   a Scale
  //
  const tr = this.basis.getTransitionTo(newBasis)
  const tscale = dist3.transitFrom(this.m, tr)
  const Scale = this.constructor
  return new Scale(newBasis, tscale)
}
