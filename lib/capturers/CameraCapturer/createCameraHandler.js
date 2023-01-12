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
    const distPx = ev.distancePx

    // Ensure to emit a cameraenter on the first measure.
    if (capturer.previousDistance === null) {
      // init
      capturer.previousDistance = distPx
      capturer.emit('cameraenter', ev)

      return
    }

    if (distPx === capturer.previousDistance) {
      // Same distance, no emissions.
      return
    }

    // Different distance, emit.
    if (distPx < capturer.previousDistance) {
      // Getting closer
      capturer.emit('cameraenter', ev)
    } else {
      // Escaping farther
      capturer.emit('cameraleave', ev)
    }

    // Update distance memory
    capturer.previousDistance = distPx
  }
}
