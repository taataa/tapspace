// Zoomable towards a single point.
// If panning is enabled, zoomable freely.

const Pinch = require('../../../interaction/Pinch')
const WheelRotate = require('../../../interaction/WheelRotate')
const nextFreedom = require('./nextFreedom')

module.exports = function (opts) {
  // tapspace.components.Viewport:rotatable(opts)
  //
  // Make the viewport rotatable.
  // The viewport can be rotated by pinch gesture and mouse wheel.
  // If a fixed center point is given, a single-pointer drag gesture
  // is enough to rotate.
  //
  // Parameters
  //   opts, optional boolean or object with props:
  //     center
  //       a Point, the center point for rotation.
  //
  // Return
  //   this, for chaining
  //

  // False opts to unbind
  if (opts === false) {
    this.removeInteraction('pinch')
    this.removeInteraction('wheel')
    return
  }

  if (!opts) {
    opts = {}
  }

  // Find interactions
  let pinch = this.getInteraction('pinch')
  let wheel = this.getInteraction('wheel')

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
  pinch = new Pinch(this, this.space, {
    freedom: freedom,
    applicator: 'viewport'
  })
  this.addInteraction('pinch', pinch)

  wheel = new WheelRotate(this, {
    center: freedom.center
  })
  this.addInteraction('wheel', wheel)

  return this
}
