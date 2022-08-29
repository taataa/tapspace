const geom = require('affineplane')

const Scale = function (basis, multiplier) {
  // tapspace.geometry.Scale(basis, multiplier)
  //
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

proto.changeBasis = function (newBasis) {
  // tapspace.geometry.Scale:changeBasis(newBasis)
  //
  // Return
  //   a Scale
  //
  const tr = this.basis.getTransitionTo(newBasis)
  const tscale = geom.dist2.transitFrom(this.s, tr)
  return new Scale(newBasis, tscale)
}

module.exports = Scale
