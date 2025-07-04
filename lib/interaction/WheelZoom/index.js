const WheelZoom = function (viewport, options) {
  // @tapspace.interaction.WheelZoom(viewport, options)
  //
  // Wheel zoom interaction for viewports.
  // Scale the origin planes by mouse wheel.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Get input form this component.
  //   options, object with properties:
  //     pivot
  //       optional Point. Defaults to the cursor position.
  //       ..The scaling is performed about this fixed point.
  //

  // TODO emit something at gesture end?
  // TODO endTimeout or endInterval, to prevent ending the gesture at
  // every wheel event.

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    pivot: null
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
proto.isWheelZoom = true

proto.bind = require('./bind')
proto.unbind = require('./unbind')
