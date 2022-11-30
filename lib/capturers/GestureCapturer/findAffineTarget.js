const findAffineAncestor = require('../../utils/findAffineAncestor')

module.exports = (pointers) => {
  // Find affine target for the given set of sensed pointers.
  // Basically picks the first target.
  //
  // Parameters:
  //   pointers
  //     a map from pointer id to {x,y,target}
  //
  // Return
  //   a Basis
  //

  const ids = Object.keys(pointers)

  if (ids.length > 0) {
    const firstId = ids[0]
    const firstPointer = pointers[firstId]
    const firstTarget = firstPointer.target
    return findAffineAncestor(firstTarget)
  }

  // If no pointers, it is an error
  throw new Error('cannot find target from empty set of pointers.')
}
