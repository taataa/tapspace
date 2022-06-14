const emitter = require('component-emitter')

const WheelCapturer = function (component, options) {
  // Mouse wheel capturer. Attempts to normalise and add compatibility
  // to wheeling and scrolling.
  //
  // Parameters:
  //   component
  //     the source for the wheel events
  //   options, optional object with props:
  //     preventDefault
  //       an optional boolean, default true.
  //       ..Set false to allow default browser behavior
  //       ..on all handled events.
  //     stopPropagation
  //       an optional boolean, default false.
  //       ..Set true to stop event bubbling on all handled events.
  //
  // Emits
  //   wheel with wheel-gesture object
  //
  // Wheel-gesture object has properties:
  //   deltaX
  //     horizontal movement in viewport pixels
  //   deltaY
  //     vertical movement in viewport pixels
  //
  const self = this

  // Normalise to component
  if (component.affine) {
    component = component.affine
  } else if (!component.proj) {
    // Only affine elements can be used for capturing.
    throw new Error('Wheel gestures cannot be captured ' +
      'from non-affine elements.')
  }
  this.component = component

  // Default options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    preventDefault: true,
    stopPropagation: false
  }, options)

  // Set as emitter
  emitter(this)

  this.onwheel = function (ev) {
    // Parameters
    //   ev
    //     browser wheel event
    //

    if (self.options.preventDefault) {
      ev.preventDefault()
    }
    if (self.options.stopPropagation) {
      ev.stopPropagation()
    }

    // Available event properties
    const x = ev.pageX
    const y = ev.pageY
    const dx = ev.deltaX
    const dy = ev.deltaY
    // const dz = ev.deltaZ // for 3D-mouses
    const dmode = ev.deltaMode

    // Attempt to normalise the unit based on the delta mode.
    // TODO find or compute more accurate multipliers
    let multiplier = 1
    switch (dmode) {
      case 0x00:
        // Deltas in pixels
        multiplier = 1
        break
      case 0x01:
        // Deltas in lines
        multiplier = 14
        break
      case 0x02:
        // Deltas in pages
        multiplier = 400
        break
      default:
        multiplier = 1
    }

    self.emit('wheel', {
      component: component, // TODO rename target
      // TODO use Point for center
      center: { x: x, y: y },
      // TODO use Vector for delta
      deltaX: multiplier * dx,
      deltaY: multiplier * dy
    })
  }

  // See issue #80 for explanation for 'passive: false'.
  // Basically the browser wants us to be explicit when
  // we set an active listener on a scroll-blocking event.
  const lopts = { passive: false }
  const target = this.component.element
  target.addEventListener('wheel', this.onwheel, lopts)
}

module.exports = WheelCapturer
const proto = WheelCapturer.prototype

// proto.update = function (mode) {
//   this.mode = mode
// }

proto.unbind = function () {
  const target = this.component.element
  target.removeEventListener('wheel', this.onwheel)
  this.onwheel = null
}
