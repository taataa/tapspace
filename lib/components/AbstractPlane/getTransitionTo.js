const geom = require('affineplane')
const plane3 = geom.plane3

module.exports = function (target) {
  // tapspace.components.AbstractPlane:getTransitionTo(target)
  //
  // Compute a transition that maps the coordinate system of this plane
  // to the coordinate system of the target plane. The resulting transition
  // is an affine transformation that can be applied to geometry on this plane
  // to compute the same geometry represented on the the target plane.
  //
  // Parameters
  //   target
  //     an AbstactPlane
  //
  // Return
  //   a plane3. A transition from this plane to the target plane.
  //
  // Throws
  //   If the planes are not connected. Probably app programming error.
  //

  if (target === this) {
    return plane3.IDENTITY
  }

  // Lowest affine ancestor. Can also be components themselves
  // if they are same or the one is ancestor of the other.
  const common = this.findCommonAncestor(target)

  // No common ancestor, no transition can be computed.
  // This is probably due to a programming error in app logic.
  // Therefore it is better to throw error than return null.
  if (common === null) {
    throw new Error('Transition between the planes does not exist because ' +
      'they are not connected.')
  }

  // Traverse DOM until the common.
  const commonEl = common.element

  // Compute transition from the source plane to the common ancestor.
  let iel = this.element
  let accum = plane3.IDENTITY
  while (iel !== commonEl) {
    accum = plane3.compose(iel.affine.plane, accum)
    iel = iel.parentElement
  }
  const sourcePlane = accum
  // Now sourcePlane is the transition from
  // source plane to the common ancestor.

  // Compute transition from the target plane to the common ancestor.
  iel = target.element
  accum = plane3.IDENTITY
  while (iel !== commonEl) {
    accum = plane3.compose(iel.affine.plane, accum)
    iel = iel.parentElement
  }
  const targetPlane = accum
  // Now targetProj is the transition from
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
  return plane3.difference(sourcePlane, targetPlane)
}
