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
    const depthPx = ev.depthPx

    // Ensure to emit a cameraenter on the first measure.
    if (capturer.previousDistance === null) {
      // init
      capturer.previousDistance = distPx
      capturer.previousDepth = depthPx
      capturer.emit('cameraenter', ev)
      capturer.emit('camerain', ev)

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

    if (depthPx < capturer.previousDepth) {
      // Component is getting larger
      capturer.emit('camerain', ev)
    } else {
      // Component is getting smaller
      capturer.emit('cameraout', ev)
    }

    // Update distance memory
    capturer.previousDistance = distPx
    capturer.previousDepth = depthPx
  }
}
