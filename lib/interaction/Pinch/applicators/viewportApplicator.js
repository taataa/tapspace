const projectForTarget = require('./utils/projectForTarget')

module.exports = (viewport, space, ev) => {
  // This is a gesture transform applicator for viewports that
  // improves perspective navigation.

  // Perspective projection => adjust effect according to target distance.
  let target = ev.target
  if (target === space) {
    // The gesture targets the viewport background.
    // target = viewport.findMostDistant()
    // target = viewport.findNearRay(ev.mean)
    target = viewport.navigationBasis
  }

  // Check if space was empty.
  if (target) {
    const deltaHat = projectForTarget(ev.delta.helm, viewport, target)
    space.transformBy(deltaHat, ev.deltaOrigin)
  }
  // else the space is empty, the target is null. Do not move.
}
