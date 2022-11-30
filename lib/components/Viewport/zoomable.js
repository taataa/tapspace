const Pinch = require('../../interaction/Pinch')
const WheelZoom = require('../../interaction/WheelZoom')

module.exports = function (options) {
  // @Viewport:zoomable(options)
  //
  // Make the viewport zoomable.
  // The viewport can be scaled by pinch gesture and mouse wheel.
  // If the pivot is not set, the viewport can also be panned meaning that
  // the viewport can be moved and zoomed freely. If the pivot point is set
  // then no pan is possible and zooming happens about the pivot.
  //
  // Example:
  // ```
  // const view = space.getViewport()
  // view.zoomable()
  // ```
  //
  // Parameters
  //   options, optional boolean or object with props:
  //     pivot
  //       a Point, the vanishing point for zoom, the center for scaling.
  //       If not set, enables viewport translation aka panning.
  //
  // Return
  //   this, for chaining
  //

  // Find interactions
  let pinch = this.getInteraction('pinch')
  let wheel = this.getInteraction('wheel')

  // False options to unbind
  if (options === false) {
    if (pinch) {
      pinch.disableDilation()
      if (!pinch.hasAnyFreedom()) {
        this.removeInteraction('pinch')
      }
    }
    if (wheel) {
      this.removeInteraction('wheel')
    }
    return
  }

  if (!options) {
    options = {}
  }

  if (pinch) {
    pinch.enableDilation(options.pivot)
  } else {
    pinch = new Pinch(this, this.space, {
      applicator: 'viewport'
    })
    pinch.enableDilation(options.pivot)
    this.addInteraction('pinch', pinch)
  }
  // assert: pinch is now set.

  if (wheel) {
    // Destroy the old wheel interaction for new options to take hold.
    // TODO maybe just update
    this.removeInteraction('wheel')
  }
  wheel = new WheelZoom(this, {
    pivot: options.pivot
  })
  this.addInteraction('wheel', wheel)

  return this
}
