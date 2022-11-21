// Zoomable towards a single point.
// If panning is enabled, zoomable freely.

const Pinch = require('../../../interaction/Pinch')
const WheelRotate = require('../../../interaction/WheelRotate')

module.exports = function (options) {
  // tapspace.components.Viewport:rotatable(options)
  //
  // Make the viewport rotatable.
  // The viewport can be rotated by pinch gesture and mouse wheel.
  // If a fixed center point is given, a single-pointer drag gesture
  // is enough to rotate.
  //
  // Parameters
  //   options, various types:
  //     a boolean, set false to disable the ability.
  //     an object with props:
  //       center
  //         a Point, the center point for rotation.
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
    pinch.enableRotation(options.center)
  } else {
    pinch = new Pinch(this, this.space, {
      applicator: 'viewport'
    })
    pinch.enableRotation(options.center)
    this.addInteraction('pinch', pinch)
  }

  if (wheel) {
    this.removeInteraction('wheel')
  }
  wheel = new WheelRotate(this, {
    center: options.center
  })
  this.addInteraction('wheel', wheel)

  return this
}
