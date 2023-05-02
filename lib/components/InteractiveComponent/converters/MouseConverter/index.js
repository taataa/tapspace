const startMouseConversion = require('./start')
const stopMouseConversion = require('./stop')

const MouseConverter = function (component) {
  this.component = component
  this.running = false

  // // Mapping from view ids to number of start calls.
  // // We keep count to be able to remove listeners on last stop call.
  // this.numRunning = {}
  //
  // Mapping from handler names to handler functions.
  this.handlers = null
}

module.exports = MouseConverter
const proto = MouseConverter.prototype

proto.start = function () {
  // Start conversion if not already running
  //
  if (this.running) {
    return
  }
  this.running = true

  // Begin conversion for the element.
  const elem = this.component.element
  this.handlers = startMouseConversion(elem)
}

proto.stop = function () {
  // Stops conversion
  if (this.running) {
    this.running = false

    const elem = this.component.element
    stopMouseConversion(elem, this.handlers)
    this.handlers = null
  }
}
