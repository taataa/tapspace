const isEventAffine = require('./isEventAffine')

module.exports = (sensor) => {
  return (ev) => {
    // Decide whether to pass or consume the event.
    if (!isEventAffine(ev)) { return }
    // Shortcircuit if no such pointer.
    // If no such pointer, the context menu does not relate to this gesture.
    if (!sensor.currPointers[ev.pointerId]) { return }
    // Consume
    ev.preventDefault()
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
