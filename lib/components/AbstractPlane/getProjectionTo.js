const proj2 = require('affineplane').proj2

module.exports = function (target) {
  // Compute a projection that maps the coordinate system of this plane
  // to the coordinate system of the target plane. The resulting projection
  // is an affine transformation that can be applied to geometry on this plane
  // to compute the same geometry represented on the the target plane.
  //
  // Parameters
  //   target
  //     an AbstactPlane
  //
  // Return
  //   proj
  //     projection from this to target
  //
  // Throws
  //   if no projection can be found. This can happen if the planes
  //   ..are not in the same affine space.
  //

  if (target === this) {
    return proj2.IDENTITY
  }

  // Lowest affine ancestor. Can also be components themselves
  // if they are same or the one is ancestor of the other.
  const common = this.findCommonAncestor(target)

  // No common ancestor, no projection can be computed.
  if (common === null) {
    throw new Error('Elements are not connected and ' +
      'thus no projection can be found between them.')
  }

  // Compute projection from the source plane to the common ancestor.
  let iel = this.element
  let sourceProj = proj2.IDENTITY
  while (iel !== common) {
    sourceProj = proj2.compose(iel.affine.proj, sourceProj)
    iel = iel.parentElement
  }
  // Now sourceProj is the projection from
  // source plane to the common ancestor.

  // Compute projection from the target plane to the common ancestor.
  iel = target.element
  let targetProj = proj2.IDENTITY
  while (iel !== common) {
    targetProj = proj2.compose(iel.affine.proj, targetProj)
    iel = iel.parentElement
  }
  // Now targetProj is the projection from
  // target plane to the common ancestor.

  // To map a point from the source plane to the target plane,
  // we first map the point to the common ancestor and from there
  // to the target. Note that we need to invert the projection
  // from the target to the common.
  const invTargetProj = proj2.invert(targetProj)
  return proj2.compose(invTargetProj, sourceProj)
}
