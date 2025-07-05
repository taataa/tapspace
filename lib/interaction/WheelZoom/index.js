const WheelZoom = function (source, target, options) {
  // @tapspace.interaction.WheelZoom(source, target, options)
  //
  // Wheel zoom interaction.
  // Scale the target by mouse wheel.
  //
  // Parameters:
  //   source
  //     an Interactive. Get input from the source component.
  //     The source component will emit `wheel` events.
  //   target
  //     a Transformer. Apply scaling to the target component.
  //   options, object with properties:
  //     invert
  //       optional boolean. Default is false.
  //       ..If true, the scaling direction is inverted.
  //

  // TODO emit something at gesture end?
  // TODO endTimeout or endInterval, to prevent ending the gesture at
  // every wheel event.

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    invert: false
  }, options)

  // Validate
  if (!source || !target) {
    throw new Error('Invalid interaction source or target.')
  }

  this.source = source
  this.target = target

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
