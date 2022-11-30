// Zoomable towards a single point.
// If panning is enabled, zoomable freely.

const Pinch = require('../../interaction/Pinch')
const WheelRotate = require('../../interaction/WheelRotate')

module.exports = function (options) {
  // @Viewport:rotatable(options)
  //
  // Make the viewport rotatable.
  // The viewport can be rotated by pinch gesture and mouse wheel.
  // If a pivot point is given, a single-pointer drag gesture
  // is enough to rotate.
  //
  // Parameters
  //   options, various types:
  //     a boolean, set false to disable the ability.
  //     an object with props:
  //       pivot
  //         a Point, the fixed point for rotation center.
  //
  // Return
  //   this, for chaining
  //

  // Find interactions
  let pinch = this.getInteraction('pinch')
  let wheel = this.getInteraction('wheel')

  // False options to disable rotation.
  if (options === false) {
    if (pinch) {
      pinch.disableRotation()
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
    pinch.enableRotation(options.pivot)
  } else {
    pinch = new Pinch(this, this.space, {
      applicator: 'viewport'
    })
    pinch.enableRotation(options.pivot)
    this.addInteraction('pinch', pinch)
  }

  if (wheel) {
    // Destroy the old wheel interaction for new options to take hold.
    // TODO maybe just update
    this.removeInteraction('wheel')
  }
  wheel = new WheelRotate(this, {
    pivot: options.pivot
  })
  this.addInteraction('wheel', wheel)

  return this
}
