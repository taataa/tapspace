const Pinch = require('../../interaction/Pinch')

module.exports = function (options) {
  // @Item:scalable(options)
  // @Item:dilatable
  //
  // A dilatable item can be scaled larger and smaller.
  // Controls item scale but does not affect item pixel size.
  //
  // Parameters:
  //   options, various types:
  //     a boolean, set false to disable the ability to dilate.
  //     an optional object with properties:
  //       pivot
  //         optional Point. Specifies a fixed point that stays fixed
  //         .. during dilation.
  //         .. If the point is relative to
  //         .. the inner basis of the item, then the dilation center follows
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
      pinch.disableDilation()
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
    pinch.enableDilation(options.pivot)
  } else {
    pinch = new Pinch(this, this)
    pinch.enableDilation(options.pivot)
    this.addInteraction('pinch', pinch)
  }

  return this
}
