const dist3 = require('affineplane').dist3

module.exports = function (newBasis) {
  // tapspace.geometry.Scale:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     a component
  //
  // Return
  //   a Scale
  //
  const tr = this.basis.getTransitionTo(newBasis)
  const tscale = dist3.transitFrom(this.s, tr)
  const Scale = this.constructor
  return new Scale(newBasis, tscale)
}
