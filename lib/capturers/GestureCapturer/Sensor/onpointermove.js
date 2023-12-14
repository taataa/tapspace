const isEventAffine = require('./isEventAffine')

module.exports = (sensor) => {
  return function (ev) {
    // A pointer moves while down.

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

    // Store the coordinate.
    const nextPointers = Object.assign({}, sensor.currPointers) // [2]
    if (nextPointers[ev.pointerId]) {
      nextPointers[ev.pointerId] = {
        x: ev.pageX,
        y: ev.pageY,
        target: ev.target
      }
    }
    // Store modifier keys
    sensor.registerModifiers(ev)

    // TODO maybe call in a non-blocking way
    sensor.onmove(sensor.currPointers, nextPointers, sensor.modifiers)

    sensor.currPointers = nextPointers
  }
}
