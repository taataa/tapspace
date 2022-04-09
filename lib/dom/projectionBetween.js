const findCommon = require('./findCommon')
const proj = require('../geom/proj')

module.exports = (sourceElement, targetElement) => {
  // Compute a projection that maps source's coordinate system
  // onto target's coordinate system. In other words,
  // the resulting projection can be applied to geometry
  // in the source's system to compute the same geometry represented
  // in the coordinate system of the target.
  //
  // Parameters:
  //   sourceElement
  //     HTMLElement
  //   targetElement
  //     HTMLElement
  //
  // Return
  //   a projection
  //
  // Throws
  //   if no projection can be found between the elements.
  //

  // Closest affine ancestor. Can also be elements themselves
  // if they are same or the one is ancestor of the other.
  const common = findCommon(sourceElement, targetElement)

  // No common ancestor, no projection can be computed.
  if (common === null) {
    throw new Error('Elements are not connected and ' +
      'thus no projection can be found between them.')
  }

  // Compute projection from the source element to the common ancestor.
  let iel = sourceElement
  let sourceProj = proj.IDENTITY
  while (iel !== common) {
    sourceProj = proj.compose(iel.affine.proj, sourceProj)
    iel = iel.parentElement
  }
  // Now sourceProj is the projection from
  // sourceElement to the common ancestor.

  // Compute projection from the target element to the common ancestor.
  iel = targetElement
  let targetProj = proj.IDENTITY
  while (iel !== common) {
    targetProj = proj.compose(iel.affine.proj, targetProj)
    iel = iel.parentElement
  }
  // Now targetProj is the projection from
  // targetElement to the common ancestor.

  // To map a point from the source element to the target element,
  // we first map the point to the common ancestor and from there
  // to the target. Note that we need to invert the projection
  // from the target to the common.
  const invTargetProj = proj.invert(targetProj)
  return proj.compose(invTargetProj, sourceProj)
}
