module.exports = (viewport) => {
  // Return: function, the wheel event handler.
  //
  return (ev) => {
    // The scaling factor.
    const factor = 1 - ev.deltaY / 1000
    // The scaling pivot stays fixed.
    // Use gesture center. Represented on the viewport.
    const pivot = ev.center

    if (viewport.isPerspective()) {
      // Perspective.
      // In perspective mode, the zooming in is implemented by moving closer.
      // We cannot scale every distance equally in perspective projection.
      // Doubling sizes close by requires much shorter move than doubling
      // sizes far way. To double perceived size of an item, you must travel
      // half the distance to the item.

      // Attempt 1
      // Let us try to set a constant target distance.
      // At that distance, the scaling effect of the move should approximate
      // the scaling apparent in the gesture.
      //
      // const camera = viewport.atCamera()
      // const delta = camera.getVectorTo(pivot)
      // const deltaUnit = delta.normalize()
      // const trip = deltaUnit.scaleBy(ev.deltaY)
      // viewport.translateBy(trip)

      // Attempt 2
      // Travel relative to the true event target.
      // The scaling effect at the target approximates the orthogonal scale.
      // Note that if the pointer is on the background, the space itself is
      // the target and the space is at viewport depth.
      const camera = viewport.atCamera()
      // We aim to move camera closer to the point of gesture target.
      let pivotOnTarget // is a Point.
      // But what if target is the viewport itself? Or space?
      // Optimally, target mass nearest the gesture mean line.
      if (ev.target === viewport || ev.target === viewport.getSpace()) {
        // const possibleTarget = viewport.findNearestMass()
        const possibleTarget = viewport.findMostDistant()
        pivotOnTarget = pivot.projectTo(possibleTarget, camera)
      } else {
        // We aim to move camera closer to the point of gesture target.
        pivotOnTarget = pivot.projectTo(ev.target, camera)
      }

      // We want to scale the length of the vector from camera to target.
      const delta = camera.getVectorTo(pivotOnTarget)
      // The desired difference vector.
      const desired = delta.scaleBy(factor)
      // A trip the viewport must take in order to reach the desired diff.
      // delta + X = desired <=> X = desired - delta
      const trip = desired.difference(delta)
      // Travel
      viewport.translateBy(trip)

      // DEBUG
      // console.log('ev.deltaY:', ev.deltaY)
      // console.log('factor:', factor)
      // console.log('camera rel.to viewport:', camera)
      // console.log('gesture center on target:', pivotOnTarget)
      // console.log('from camera to gesture center:', delta)
      // console.log('desired vec from cam to center:', desired)
      // console.log('trip for camera to take:', trip)
    } else {
      // Orthogonal
      viewport.scaleBy(factor, pivot)
    }
    // TODO limit extreme travel
    viewport.emit('wheel', ev)
  }
}
