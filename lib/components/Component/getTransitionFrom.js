const plane3 = require('affineplane').plane3

module.exports = function (source, silent) {
  // @Component:getTransitionFrom(source[, silent])
  //
  // Compute a coordinate transition matrix from the source basis
  // to this basis. The transition matrix can be used to convert
  // coordinates and geometry between bases.
  // Note that if one of the two bases or a basis between them moves
  // then you should compute the transition matrix again.
  //
  // Parameters:
  //   source
  //     a Component
  //   silent
  //     optional boolean, default false. Set false to throw an error if
  //     .. the components are not connected in an affine tree.
  //     .. Set true to return null instead.
  //
  // Return
  //   a plane3, a basis transition matrix.
  //
  // Complexity
  //   O(d) where d is the depth of the affine tree.
  //

  const tr = this.getTransitionTo(source, silent)
  const itr = plane3.invert(tr)
  return itr
}
