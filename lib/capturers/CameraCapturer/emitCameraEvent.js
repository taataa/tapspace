module.exports = (capturer) => {
  return () => {
    // The current distance, measured on the viewport.
    const cameraPoint = capturer.viewport.atCamera()
    const targetPoint = capturer.target.atAnchor()
    const dist = cameraPoint.getDistanceTo(targetPoint).getNumber()

    // Normalize prevDist
    let prevDist
    if (capturer.previousDistance) {
      prevDist = capturer.previousDistance
    } else {
      // init
      capturer.previousDistance = dist
      prevDist = dist
    }

    if (dist === prevDist) {
      // Same distance, no emissions.
      return
    }

    // Different band, emit.
    if (dist < prevDist) {
      // Getting closer
      capturer.emit('cameraenter', {
        // TODO cover
        distance: dist,
        viewport: capturer.viewport
      })
    } else {
      // Escaping farther
      capturer.emit('cameraleave', {
        // TODO cover
        distance: dist,
        viewport: capturer.viewport
      })
    }

    // Update distance memory
    capturer.previousDistance = dist
  }
}
