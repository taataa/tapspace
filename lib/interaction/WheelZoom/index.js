
const WheelZoom = function (viewport, options) {
  // Wheel zoom interaction for viewports.
  // Scale the viewport layers by mouse wheel.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Get input form this component.
  //   options, object with properties:
  //     center
  //       a Point. The center point for the scaling.
  //       ..TODO Defaults to the cursor position.
  //

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    center: null
  }, options)

  // Emit events via viewport
  // TODO see if valid viewport
  this.viewport = viewport

  // Keep track of listeners for unbind
  this.onwheel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
}

module.exports = WheelZoom
const proto = WheelZoom.prototype

proto.bind = function () {
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.onwheel = (ev) => {
    const factor = 1 - ev.deltaY / 1000
    self.viewport.scaleBy(factor)
    // TODO limit travel
    self.viewport.emit('wheel', ev)
  }

  const capturer = this.viewport.capturer('wheel')
  capturer.on('wheel', this.onwheel)
}

proto.unbind = function () {
  // Unbind listeners
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.viewport.capturer('wheel')
    capturer.off('wheel', this.onwheel)
    this.onwheel = null
  }
}
