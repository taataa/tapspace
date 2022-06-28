const proj2 = require('affineplane').proj2

const Scale = function (basis, multiplier) {
  // The scale multiplier in space.
  // The multiplier depends on the scale of the coordinate space and
  // therefore the multiplier needs conversion between planes.
  // In contrast, a scaling is a change in the scale and does not depend on
  // the plane.
  //
  // Parameters
  //   basis
  //     a Component
  //   multiplier
  //     a number, the scale multiplier relative to the basis scale.
  //
  this.basis = basis
  this.s = multiplier
}

const proto = Scale.prototype

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = this.basis.getProjectionTo(newBasis)
  const pscale = proj2.dist2(pr, this.s)
  return new Scale(newBasis, pscale)
}

module.exports = Scale
