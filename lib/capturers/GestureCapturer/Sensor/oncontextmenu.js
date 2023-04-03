module.exports = (sensor) => {
  return (ev) => {
    // Context menu was brought up somewhere in the document.
    // Therefore we want to cancel the ongoing gesture.

    if (!sensor.started) {
      // No ongoing gesture, nothing to cancel.
      return
    }

    // Collect last pointers for emit.
    const lastPointers = Object.assign({}, sensor.currPointers)
    // Cancel all the pointers
    sensor.currPointers = {}
    // Declare gesture as cancelled
    sensor.started = false
    // TODO should we explicitly cancel also the pointer capture?
    sensor.oncancel(lastPointers)
  }
}
