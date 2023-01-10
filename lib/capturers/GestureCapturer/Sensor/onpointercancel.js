const isEventAffine = require('./isEventAffine')

module.exports = (sensor) => {
  return function (ev) {
    // A pointer is cancelled, e.g. a device is disconnected.
    // A recommendation for cancelling is that the effect of the pointer
    // is discarded. However, the sensor cannot know what the gesture does.
    // Therefore it probably a good compromise to keep the gesture going
    // regardless of cancelled pointers until the last pointer.
    // If the last pointer cancels, then we announce the gesture as cancelled.

    // Shortcircuit if not started.
    if (!sensor.started) { return }

    // Decide whether to pass or consume the event.
    if (!isEventAffine(ev)) { return }

    // Shortcircuit if no such pointer
    if (!sensor.currPointers[ev.pointerId]) { return }

    // Consume
    if (sensor.options.preventDefault) {
      ev.preventDefault()
    }
    // if (sensor.options.stopPropagation) {
    //   ev.stopPropagation()
    // }

    const nextPointers = Object.assign({}, sensor.currPointers)
    // Remove the cancelled pointer from the set.
    delete nextPointers[ev.pointerId]

    // Declare whole gesture as cancelled if the last pointer cancels.
    // See also [1] on why Object.keys is used here to avoid bugs.
    if (Object.keys(nextPointers).length < 1) {
      sensor.started = false
      // Note: we send the last pointers, with the cancelled pointer,
      // not the empty next pointers object.
      sensor.oncancel(sensor.currPointers)
    }

    // The remaining pointers become the current pointers.
    sensor.currPointers = nextPointers
  }
}
