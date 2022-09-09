const dist2 = require('affineplane').dist2

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
  const tscale = dist2.transitFrom(this.s, tr)
  const Scale = this.constructor
  return new Scale(newBasis, tscale)
}
