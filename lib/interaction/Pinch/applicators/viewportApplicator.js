const projectForTarget = require('./utils/projectForTarget')

module.exports = (viewport, space, ev) => {
  // This is a gesture transform applicator for viewports that
  // improves navigation in perspective mode.

  if (!viewport.isPerspective()) {
    // Orthogonal viewport projection = target at the viewport depth.
    space.transformBy(ev.delta, ev.deltaOrigin)
    return
  }

  // Perspective projection => adjust effect according to target distance.
  let target = ev.target
  if (target === space) {
    // Gesture targets the space background. Find near items.
    // const possibleTarget = viewport.findNearestMass()
    // OPTIMIZE do not run at every event
    target = viewport.findMostDistant()
  }

  // Check if space was empty.
  if (target) {
    const deltaHat = projectForTarget(ev.delta.helm, viewport, target)
    space.transformBy(deltaHat, ev.deltaOrigin)
  }
  // else the space is empty, the target is null. Do not move.
}
