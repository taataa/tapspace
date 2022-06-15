// Zoomable towards a single point.
// If panning is enabled, zoomable freely.

const PinchLayers = require('../../../interaction/PinchLayers')
const WheelRotate = require('../../../interaction/WheelRotate')
const nextFreedom = require('./nextFreedom')

module.exports = function (opts) {
  // Make the viewport zoomable.
  // The viewport can be scaled by pinch gesture and mouse wheel.
  //
  // Parameters
  //   opts, optional boolean or object with props:
  //     center
  //       a Point, the vanishing point for zoom.
  //
  // Return
  //   this, for chaining
  //

  // False opts to unbind
  if (opts === false) {
    if (this.interactions.pinch) {
      this.interactions.pinch.unbind()
      delete this.interactions.pinch
    }
    if (this.interactions.wheel) {
      this.interactions.wheel.unbind()
      delete this.interactions.wheel
    }
    return
  }

  if (!opts) {
    opts = {}
  }

  // Find interactions
  let pinch = this.interactions.pinch
  let wheel = this.interactions.wheel

  // Find freedom mode
  let freedom = {
    type: opts.center ? 'R' : 'TR',
    center: opts.center
  }

  if (pinch) {
    // Construct freedom based on previous freedom.
    const exfreedom = pinch.getFreedom()
    freedom = nextFreedom(exfreedom, freedom)
    // Destroy the old interaction for new options to take hold.
    // TODO maybe just update
    pinch.unbind()
  }

  if (wheel) {
    // Destroy the old wheel interaction for new options to take hold.
    // TODO maybe just update
    wheel.unbind()
  }

  // Not started. Begin interaction.
  pinch = new PinchLayers(this, {
    freedom: freedom
  })
  pinch.bind()
  this.interactions.pinch = pinch

  wheel = new WheelRotate(this)
  wheel.bind()
  this.interactions.wheel = wheel

  return this
}
