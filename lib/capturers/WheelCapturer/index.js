const Capturer = require('../Capturer')
const createWheelHandler = require('./createWheelHandler')

const WheelCapturer = function (component, options) {
  // tapspace.capturers.WheelCapturer(component, options)
  //
  // Mouse wheel capturer. Attempts to normalise and add compatibility
  // to wheeling and scrolling.
  //
  // Parameters:
  //   component
  //     a Plane, the source for the wheel events
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
  //     a Point, the pointer location.
  //   component
  //     a Plane on which the center is measured. The viewport.
  //   target
  //     a Plane closest to the original event target.
  //   deltaX
  //     a number, normalized horizontal movement of the mouse wheel.
  //   deltaY
  //     a number, normalized vertical movement of the mouse wheel.
  //

  // Inherit
  Capturer.call(this)

  // Validate component
  if (!component || !component.tran) {
    throw new Error('Invalid component')
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

  this.onwheel = null
}

module.exports = WheelCapturer
const proto = WheelCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

proto.bind = function () {
  // tapspace.capturers.WheelCapturer:bind()
  //
  // Attach event listeners.
  //

  this.onwheel = createWheelHandler(this)

  // See issue #80 for explanation for 'passive: false'.
  // Basically the browser wants us to be explicit when
  // we set an active listener on a scroll-blocking event.
  const lopts = { passive: false }
  const target = this.component.element
  target.addEventListener('wheel', this.onwheel, lopts)
}

proto.update = function (options) {
  // tapspace.capturers.WheelCapturer:update(options)
  // Update capturer options.
  this.options = Object.assign({}, this.options, options)
}

proto.unbind = function () {
  // tapspace.capturers.WheelCapturer:unbind()
  //
  // Remove all wheel capturer event listeners from the element.
  //
  const target = this.component.element
  target.removeEventListener('wheel', this.onwheel)
  this.onwheel = null
}
