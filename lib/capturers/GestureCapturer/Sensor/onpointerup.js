const isEventAffine = require('./isEventAffine')

module.exports = (sensor) => {
  return function (ev) {
    // A pointer is lifted.

    // Shortcircuit if not started.
    if (!sensor.started) { return }

    // Decide whether to pass or consume the event.
    if (!isEventAffine(ev)) { return }

    // Shortcircuit if no such pointer.
    // Happens when both pointerup and pointerleave fire.
    if (!sensor.currPointers[ev.pointerId]) { return }

    // Consume
    if (sensor.options.preventDefault) {
      ev.preventDefault()
    }
    // if (sensor.options.stopPropagation) {
    //   ev.stopPropagation()
    // }

    const nextPointers = Object.assign({}, sensor.currPointers)
    // Remove the ending pointer from the set.
    delete nextPointers[ev.pointerId]
    // We assume that ending pointers are not moved from last touchmove
    // although the coordinates could be accessed via
    // ev.changedTouches[i].pageX and .pageY.

    // Declare gesture as ended when there are no pointers left.
    // See also [1] on why Object.keys is used here to avoid bugs.
    if (Object.keys(nextPointers).length < 1) {
      sensor.started = false
      // Note: we send last pointers, not the next cuz empty.
      sensor.onend(sensor.currPointers)
    }

    // The remaining pointers become the current pointers.
    sensor.currPointers = nextPointers
  }
}
