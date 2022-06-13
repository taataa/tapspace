const PinchLayers = require('../../interaction/PinchLayers')

module.exports = function (opts) {
  // Make item draggable.
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Return
  //   this, for chaining
  //

  // NOTE Draggable is better term than movable because
  // movable is meaningful in two sense: moveable programmatically
  // or moveable physically by user.
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
  let freedom = 'T'

  if (pinch) {
    // Set freedom based on previous freedom.
    const prevfreedom = pinch.getOptions().freedom
    freedom = {
      I: 'T',
      T: 'T',
      S: 'TS',
      R: 'TR',
      TS: 'TS',
      TR: 'TR',
      SR: 'TSR',
      TSR: 'TSR'
    }[prevfreedom]
    pinch.unbind()
  }

  // Not started. Begin interaction.
  pinch = new PinchLayers(this, {
    freedom: freedom
    // No center
  })
  pinch.bind()
  this.interactions.pinch = pinch

  return this
}
