const projectionBetween = require('../dom/projectionBetween')
const proj = require('../geom/proj')

const Distance = function (basis, d) {
  // Parameters
  //   basis
  //     HTMLElement or AffineElement
  //   d
  //     number, a measure. Cannot be negative.
  //
  if (basis.proj) {
    // AffineElement
    basis = basis.el
  }
  this.basis = basis
  this.d = d
}

const proto = Distance.prototype

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = projectionBetween(this.basis, newBasis)
  const pd = proj.distance(pr, this)
  return new Distance(newBasis, pd)
}

// proto.multiply =
proto.scaleBy = function (multiplier) {
  // Return new Distance
  return new Distance(this.basis, this.d * multiplier)
}

module.exports = Distance
