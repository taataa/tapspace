const Pinch = require('../../../interaction/Pinch')
const WheelZoom = require('../../../interaction/WheelZoom')
const nextFreedom = require('./nextFreedom')

module.exports = function (opts) {
  // tapspace.components.Viewport:zoomable(opts)
  //
  // Make the viewport zoomable.
  // The viewport can be scaled by pinch gesture and mouse wheel.
  // If the viewport panning is also enabled, the viewport can
  // be moved and zoomed freely.
  //
  // Parameters
  //   opts, optional boolean or object with props:
  //     center
  //       a Point, the vanishing point for zoom.
  //       Defaults to gesture mean point.
  //
  // Return
  //   this, for chaining
  //
  // Usage:
  // ```
  // const view = space.getViewport()
  // view.zoomable()
  // ```
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
    type: opts.center ? 'S' : 'TS',
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
  pinch = new Pinch(this, {
    freedom: freedom,
    applicator: 'viewport'
  })
  this.addInteraction('pinch', pinch)

  wheel = new WheelZoom(this)
  this.addInteraction('wheel', wheel)

  return this
}
