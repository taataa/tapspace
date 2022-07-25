const proj2 = require('affineplane').proj2

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

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  // tapspace.geometry.Size:projectTo(newBasis)
  //
  const pr = this.basis.getProjectionTo(newBasis)
  const pw = proj2.dist2(pr, this.w)
  const ph = proj2.dist2(pr, this.h)
  return new Size(newBasis, pw, ph)
}
