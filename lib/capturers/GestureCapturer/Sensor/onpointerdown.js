const isEventAffine = require('./isEventAffine')

module.exports = (sensor) => {
  return function (ev) {
    // Sensor:onpointerdown(ev)
    //
    // A new pointer appears.
    //

    // Decide whether to pass or consume the event.
    if (!isEventAffine(ev)) { return }

    // Consume
    if (sensor.options.preventDefault) {
      ev.preventDefault()
    }
    // if (self.options.stopPropagation) {
    //   ev.stopPropagation()
    // }

    // Make mouse behave as touch: capture the pointer.
    // Browsers call releasePointerCapture automatically on up or leave.
    // Note use of ev.target instead of self.element. This way click and other
    // events on the descendants of self.element are not stolen and the events
    // propagate through as expected.
    ev.target.setPointerCapture(ev.pointerId)

    // Register the new pointer.
    const nextPointers = Object.assign({}, sensor.currPointers) // See [2]
    // Store the coordinate.
    nextPointers[ev.pointerId] = {
      x: ev.pageX,
      y: ev.pageY,
      target: ev.target
    }

    // Declare the gesture as started.
    if (!sensor.started) {
      sensor.started = true
      // Send the sensed pointers to the gesture capturer.
      sensor.onstart(nextPointers)
    }

    sensor.currPointers = nextPointers
  }
}
