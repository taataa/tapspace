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
  //     a component, the Viewport.
  //   target
  //     a component.
  //
  // Return
  //   a helm2, ready to be applied to the viewport.
  //

  // DEBUG
  // console.log('PROJECT FOR TARGET')
  // console.log('pinch target:', target)
  // console.log('pinch basis:', viewport)
  // console.log('pinch transform:', tr)

  // The gesture pan is stored in ev.delta, being a helm2 on the viewport.
  // We want the viewport to pan so that the pointer movement
  // is consistent with the pan not at the viewport depth but
  // at the depth of the gesture target element.

  // The delta is on viewport. We want to know how much to move planes so that
  // the item far away moves visually as much as the pointer on the delta.
  const targetPlane = viewport.getTransitionFrom(target)
  const cam = viewport.atCamera().point
  const trProjected = helm2.projectTo(tr, targetPlane, cam)
  // Projected is represented on the target.
  // The target may have rotations and scalings.
  // Transit back to view.
  const trProjOnView = helm2.transitFrom(trProjected, targetPlane)
  return trProjOnView
}
