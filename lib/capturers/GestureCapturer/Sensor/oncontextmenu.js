module.exports = (sensor) => {
  return (ev) => {
    // Context menu was brought up somewhere in the document.
    // Therefore we want to cancel the ongoing gesture.

    // If no ongoing gesture, nothing to cancel.
    if (!sensor.started) { return }

    // Collect last pointers for emit.
    const lastPointers = Object.assign({}, sensor.currPointers)
    // Cancel all the pointers
    sensor.currPointers = {}

    // Store modifier keys
    sensor.registerModifiers(ev)

    // Declare gesture as cancelled
    sensor.started = false
    // TODO should we explicitly cancel also the pointer capture?
    sensor.oncancel(lastPointers, sensor.modifiers)
  }
}
