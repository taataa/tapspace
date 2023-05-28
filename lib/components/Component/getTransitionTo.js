const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (target, silent) {
  // @Component:getTransitionTo(target[, silent])
  //
  // Compute a transition that maps the coordinate system of this basis
  // to the coordinate system of the target basis. The resulting transition
  // is an affine transformation that can be applied to geometry on this basis
  // to compute the same geometry represented on the the target basis.
  //
  // Parameters
  //   target
  //     a Component
  //   silent
  //     optional boolean, default false. Set false to throw an error if
  //     .. the components are not connected in an affine tree.
  //     .. Set true to return null instead.
  //
  // Return
  //   a plane3. A transition from this plane to the target plane.
  //
  // Throws
  //   If the planes are not connected. Probably app programming error.
  //
  // Complexity
  //   O(d) where d is the depth of the affine tree.
  //

  if (target === this) {
    return plane3.IDENTITY
  }

  // Lowest affine ancestor. Can also be components themselves
  // if they are same or the one is ancestor of the other.
  const common = this.findCommonAncestor(target)

  // No common ancestor, no transition can be computed.
  // This can be due to a programming error in app logic.
  // Therefore it might be better to throw error than return null.
  // However, the caller might want to know if components are not connected.
  // The caller would need duplicate findCommonAncestor to avoid exceptions.
  // Thus null might be good after all.
  if (common === null) {
    if (silent) {
      return null
    }
    throw new Error('Transition between the planes does not exist because ' +
      'they are not connected.')
  }

  // Traverse DOM until the common.
  const commonEl = common.element

  // Compute transition from the source plane to the common ancestor.
  let iel = this.element
  let accum = plane3.IDENTITY
  while (iel !== commonEl) {
    accum = plane3.compose(iel.affine.tran, accum)
    iel = iel.parentElement
  }
  const sourcePlane = accum
  // Now sourcePlane is the transition from
  // source plane to the common ancestor.

  // Compute transition from the target plane to the common ancestor.
  iel = target.element
  accum = plane3.IDENTITY
  while (iel !== commonEl) {
    accum = plane3.compose(iel.affine.tran, accum)
    iel = iel.parentElement
  }
  const targetPlane = accum
  // Now targetPlane is the transition from
  // target plane to the common ancestor.

  // To map a point from the source plane to the target plane,
  // we first map the point to the common ancestor and from there
  // to the target. Note that we need to invert the transition
  // from the target to the common.
  //
  // Old way
  //   const invTarget = plane2.invert(targetPlane)
  //   return plane2.compose(invTarget, sourcePlane)
  // New way; with one call
  return plane3.transitTo(sourcePlane, targetPlane)
}
