module.exports = (capturer) => {
  return (ev) => {
    // Convert and filter `measured` events to camera events. Camera events
    // are directed, based on does the camera move closer or farther.
    //
    // Parameters:
    //   ev
    //     a `measured` event emitted from the captured plane.
    //

    // The current distance, measured on the viewport.
    const dist = ev.distancePx

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

    // Different distance, emit.
    if (dist < prevDist) {
      // Getting closer
      capturer.emit('cameraenter', ev)
    } else {
      // Escaping farther
      capturer.emit('cameraleave', ev)
    }

    // Update distance memory
    capturer.previousDistance = dist
  }
}
