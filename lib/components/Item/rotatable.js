const Pinch = require('../../interaction/Pinch')

module.exports = function (options) {
  // @Item:rotatable(options)
  // @Item:rotateable
  //
  // A rotatable item can be turned around a center point.
  //
  // Parameters:
  //   options, various types:
  //     a boolean, set false to disable the ability to rotate.
  //     an optional object with properties:
  //       center
  //         optional Point. Specifies a center point about which
  //         .. the item can be rotated.
  //         .. If the point is relative to
  //         .. the inner basis of the item, then the rotation center follows
  //         .. possible translations of the item.
  //
  // Return
  //   this, for chaining
  //

  // Find existing interaction
  let pinch = this.getInteraction('pinch')

  // False to disable.
  if (options === false) {
    if (pinch) {
      pinch.disableRotation()
      if (!pinch.hasAnyFreedom()) {
        this.removeInteraction('pinch')
      }
    }
    return
  }

  // Normalize options
  if (!options) {
    options = {}
  }

  if (pinch) {
    pinch.enableRotation(options.center)
  } else {
    pinch = new Pinch(this, this)
    pinch.enableRotation(options.center)
    this.addInteraction('pinch', pinch)
  }

  return this
}
