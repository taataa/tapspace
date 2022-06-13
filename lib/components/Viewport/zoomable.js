// Zoomable towards a single point.
// If panning is enabled, zoomable freely.

const PinchLayers = require('../../interaction/PinchLayers')

module.exports = function (opts) {
  // Make item draggable.
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Parameters
  //   opts, optional boolean or object with props:
  //     center
  //       a Point, the vanishing point of zoom.
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

  if (!opts) {
    opts = {}
  }

  // Find interaction
  let pinch = this.interactions.pinch
  // Find freedom mode
  let freedom = opts.center ? 'S' : 'TS'

  if (pinch) {
    // Construct freedom based on previous freedom.
    const exfreedom = pinch.getOptions().freedom

    if (opts.center) {
      // If center point is given, do not allow translation.
      freedom = {
        I: 'S',
        T: 'S',
        S: 'S',
        R: 'SR',
        TS: 'S',
        TR: 'SR',
        SR: 'SR',
        TSR: 'SR'
      }[exfreedom]
    } else {
      // No fixed center point given. Enable translation if no center set.
      freedom = {
        I: 'TS',
        T: 'TS',
        S: 'S', // around original center
        R: 'RS', // around original center
        TS: 'TS',
        TR: 'TR',
        SR: 'SR', // around original center
        TSR: 'TSR'
      }[exfreedom]
    }
    pinch.unbind()
  }

  // Not started. Begin interaction.
  pinch = new PinchLayers(this, {
    freedom: freedom,
    center: opts.center
  })
  pinch.bind()
  this.interactions.pinch = pinch

  return this
}
