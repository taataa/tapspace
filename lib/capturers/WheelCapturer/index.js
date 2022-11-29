const emitter = require('component-emitter')
const findAffineAncestor = require('../../utils/findAffineAncestor')

const WheelCapturer = function (component, options) {
  // tapspace.capturers.WheelCapturer(component, options)
  //
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
  //   center
  //     a Point
  //   component
  //     a Component on which the center is measured. The viewport.
  //   target
  //     a Component closest to the original event target.
  //   deltaX
  //     a number, normalized horizontal movement of the mouse wheel.
  //   deltaY
  //     a number, normalized vertical movement of the mouse wheel.
  //
  const self = this

  // Normalise to component
  if (component.affine) {
    component = component.affine
  } else if (!component.tran) {
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

    // Get cursor position to scale around.
    let xy
    // Normalise page coordinates onto the root component if possible.
    // We assume the root component has the same coord system as the page.
    // Root component i.e Viewport.
    const root = self.component.getRoot()
    if (root.atPage) {
      xy = root.atPage(ev.pageX, ev.pageY)
    } else {
      // Fall back to page coordinates
      xy = root.at(ev.pageX, ev.pageY)
    }

    // Wheel movement
    const dx = ev.deltaX
    const dy = ev.deltaY
    // const dz = ev.deltaZ // for 3D-mouses

    // Unit of wheel movement
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

    // Find an affine component closest to the true ev.target in DOM.
    const affineTarget = findAffineAncestor(ev.target)

    self.emit('wheel', {
      // Point for gesture center
      center: xy,
      component: component,
      target: affineTarget,
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

proto.update = function (options) {
  // tapspace.capturers.WheelCapturer:update(options)
  // Update capturer options
  this.options = Object.assign({}, this.options, options)
}

proto.unbind = function () {
  // tapspace.capturers.WheelCapturer:unbind()
  //
  // Remove event listeners from element.
  //
  const target = this.component.element
  target.removeEventListener('wheel', this.onwheel)
  this.onwheel = null
}