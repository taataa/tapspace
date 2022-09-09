const PinchView = require('../../../interaction/PinchView')
const nextFreedom = require('./nextFreedom')

module.exports = function (opts) {
  // tapspace.components.Viewport:pannable(opts)
  //
  // Make the viewport pannable (= draggable).
  // The view can be moved freely by a set of pointers.
  // The view maintains the size and the angle.
  //
  // Return
  //   this, for chaining
  //

  // False opts to unbind
  if (opts === false) {
    if (this.interactions.pinch) {
      this.interactions.pinch.unbind()
      this.interactions.pinch = null
    }
    return
  }

  // Find interaction
  let pinch = this.interactions.pinch
  // Find freedom mode
  let freedom = {
    type: 'T'
  }

  if (pinch) {
    // Set freedom based on previous freedom.
    const exfreedom = pinch.getFreedom()
    freedom = nextFreedom(exfreedom, freedom)
    pinch.unbind()
  }

  // Not started. Begin interaction.
  pinch = new PinchView(this, {
    freedom: freedom
    // No center
  })
  pinch.bind()
  this.interactions.pinch = pinch

  return this
}
