const helm2 = require('affineplane').helm2

module.exports = (tr, viewport, target) => {
  // Perspective adjustment for transformation.
  // We have two planes: viewport and target.
  // We have captured transformation tr on viewport.
  // We would like to move the viewport so that it seems as we
  // applied the transformation on the target plane instead.
  //
  // Parameters:
  //   tr
  //     a helm2 relative to viewport. The transformation to adjust.
  //   viewport
  //     a Viewport.
  //   target
  //     an Item.
  //
  // Return
  //   a helm3, ready to be applied to the viewport.
  //

  // DEBUG
  // console.log('PROJECT FOR TARGET')
  // console.log('pinch target:', target)
  // console.log('pinch basis:', viewport)
  // console.log('pinch transform:', tr)

  // The gesture pan is stored in ev.delta, being a helm2 on the viewport.
  // We want the viewport to pan so that the pointer movement
  // is consistent with the pan not at the viewport depth but
  // at the depth of the element which the gesture targets.

  // The delta is on viewport. We want to know how much to move planes so that
  // the item far away moves visually as much as the pointer on the delta.
  const targetPlane = viewport.getTransitionFrom(target)
  const cam = viewport.atCamera().point
  // How large this transformation is on the target?
  const trProjected = helm2.projectTo(tr, targetPlane, cam)
  // The projected transformation is represented on the target.
  // The target may have rotations and scalings.
  // Therefore transit back to view to get transformation
  // we can easily apply to root bases.
  const trProjOnView = helm2.transitFrom(trProjected, targetPlane)
  // Convert to helm3 for consistency.
  // The pinch gesture happens on viewport in 2D, thus translation z=0.
  trProjOnView.z = 0

  return trProjOnView
}
