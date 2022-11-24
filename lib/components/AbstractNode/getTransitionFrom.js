const plane3 = require('affineplane').plane3

module.exports = function (source) {
  // @Basis:getTransitionFrom(source)
  //
  // Parameters:
  //   source
  //     a Basis
  //
  // Return
  //   a plane3, a plane transition matrix.
  //
  const tr = this.getTransitionTo(source)
  const itr = plane3.invert(tr)
  return itr
}
