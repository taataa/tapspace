const findTarget = require('./findTarget')

module.exports = (viewport) => {
  // Return: function, the wheel event handler.
  //
  return (ev) => {
    // The scaling factor.
    const factor = 1 - ev.deltaY / 1000
    // The scaling pivot stays fixed.
    // Use gesture center. Represented on the viewport.
    const pivot = ev.center

    // Transform viewport according to its projection mode.
    if (viewport.proj === '2d') {
      // Just scale. 2D.
      viewport.scaleBy(1 / factor, pivot)
    } else if (viewport.proj === '3d') {
      // In 3D mode we need to transform w.r.t. the target.
      // Also, if the user interacts with the background, must pick a target.
      const selectedTarget = findTarget(viewport, ev)
      // Project the pivot onto the target.
      const camera = viewport.atCamera()
      const pivotOnTarget = pivot.projectTo(selectedTarget, camera)
      // We want to scale the length of the vector from camera to target.
      const delta = camera.getVectorTo(pivotOnTarget)
      // The desired difference vector.
      const desired = delta.scaleBy(factor)
      // A trip the viewport must take in order to reach the desired diff.
      // delta + X = desired <=> X = desired - delta
      const trip = desired.difference(delta)
      // Travel
      viewport.translateBy(trip)
    }

    // DEBUG
    // console.log('ev.deltaY:', ev.deltaY)
    // console.log('factor:', factor)
    // console.log('camera rel.to viewport:', camera)
    // console.log('gesture center on target:', pivotOnTarget)
    // console.log('from camera to gesture center:', delta)
    // console.log('desired vec from cam to center:', desired)
    // console.log('trip for camera to take:', trip)

    // TODO limit extreme travel

    viewport.emit('wheel', ev)
  }
}
