const plane3 = require('affineplane').plane3

module.exports = function (source) {
  // @Basis:getTransitionFrom(source)
  //
  // Compute a coordinate transition matrix from the source basis
  // to this basis. The transition matrix can be used to convert
  // coordinates and geometry between bases.
  // Note that if one of the two bases or a basis between them moves
  // then you should compute the transition matrix again.
  //
  // Parameters:
  //   source
  //     a Basis
  //
  // Return
  //   a plane3, a basis transition matrix.
  //
  const tr = this.getTransitionTo(source)
  const itr = plane3.invert(tr)
  return itr
}
