const path3 = require('affineplane').path3

module.exports = function (newBasis) {
  // @Path:changeBasis(newBasis)
  //
  // Transit the path to another coordinate basis.
  //
  // Parameters:
  //   newBasis
  //     a Component
  //
  // Return:
  //   a Path
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const npath = path3.transitFrom(this.path, tran)
  const Path = this.constructor
  return new Path(newBasis, npath)
}
