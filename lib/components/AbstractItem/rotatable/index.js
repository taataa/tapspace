const Pinch = require('../../../interaction/Pinch')
const nextFreedom = require('./nextFreedom')

module.exports = function (options) {
  // tapspace.components.AbstractItem:rotatable(options)
  // tapspace.components.AbstractItem:rotateable
  //
  // A rotatable item can be turned around a center point.
  //
  // Parameters:
  //   options, various types:
  //     a boolean, set false to disable the ability to rotate.
  //     an optional object with properties:
  //       center
  //         a Point. Specifies a center point about which
  //         .. the item can be rotated.
  //         .. If the point is relative to
  //         .. the inner basis of the item, then the rotation center follows
  //         .. possible translations of the item.
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    if (this.interactions.pinch) {
      this.interactions.pinch.unbind()
      delete this.interactions.pinch
    }
    return
  }

  // Find existing interaction
  let pinch = this.interactions.pinch

  // Default freedom mode
  let freedom = {
    type: options.center ? 'R' : 'TR',
    center: options.center
  }

  if (pinch) {
    // Set freedom based on previous freedom.
    const exfreedom = pinch.getFreedom()
    freedom = nextFreedom(exfreedom, freedom)
    // Reset
    pinch.unbind()
  }

  // Begin interaction
  pinch = new Pinch(this, this, {
    freedom: freedom
  })
  pinch.bind()
  this.interactions.pinch = pinch

  return this
}
