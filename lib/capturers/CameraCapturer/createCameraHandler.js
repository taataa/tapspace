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
    const distToCamera = ev.distanceToCamera
    const depthOnCamera = ev.depthOnCamera

    // Ensure to emit a cameraenter on the first measure.
    if (capturer.previousDistance === null) {
      // init
      capturer.previousDistance = distToCamera
      capturer.previousDepth = depthOnCamera
      capturer.emit('cameraenter', ev)
      capturer.emit('camerain', ev)

      return
    }

    if (distToCamera === capturer.previousDistance) {
      // Same distance, no emissions.
      return
    }

    // Different distance, emit.
    if (distToCamera < capturer.previousDistance) {
      // Getting closer
      capturer.emit('cameraenter', ev)
    } else {
      // Escaping farther
      capturer.emit('cameraleave', ev)
    }

    if (depthOnCamera < capturer.previousDepth) {
      // Component is getting larger
      capturer.emit('camerain', ev)
    } else {
      // Component is getting smaller
      capturer.emit('cameraout', ev)
    }

    // Update distance memory
    capturer.previousDistance = distToCamera
    capturer.previousDepth = depthOnCamera
  }
}
