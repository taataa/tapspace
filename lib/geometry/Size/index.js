const geom = require('affineplane')

const Size = function (basis, width, height) {
  // tapspace.geometry.Size(basis, width, height)
  //
  // A rectangular size in space. Basically it is two-dimensional distance.
  //
  // Parameters
  //   basis
  //     a Component
  //   width
  //     a number, the width on the basis
  //   height
  //     a number, the height on the basis
  //
  this.basis = basis
  this.w = width
  this.h = height
}

const proto = Size.prototype
module.exports = Size

proto.at = require('./at')
proto.atNorm = require('./atNorm')
proto.atToNorm = require('./atToNorm')

proto.changeBasis = function (newBasis) {
  // tapspace.geometry.Size:changeBasis(newBasis)
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pw = geom.dist2.transitFrom(this.w, pr)
  const ph = geom.dist2.transitFrom(this.h, pr)
  return new Size(newBasis, pw, ph)
}
