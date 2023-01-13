const Capturer = require('../Capturer')

const KeyboardCapturer = function (component, options) {
  // tapspace.capturers.KeyboardCapturer(component, options)
  //
  // Inherits Capturer
  //
  // Detect keyboard navigation events. Only focusable components
  // emit keyboard events.
  //
  // Parameters:
  //   component
  //     a Plane, the source for the keyboard events
  //
  // Emits
  //   keydown
  //   keyup
  //

  // Inherit
  Capturer.call(this)

  // Validate component
  if (!component || !component.tran) {
    throw new Error('Invalid component')
  }
  this.component = component

  this.bound = false
}

module.exports = KeyboardCapturer
const proto = KeyboardCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

proto.bind = function () {
  // tapspace.capturers.KeyboardCapturer:bind()
  //
  // Attach event listeners.
  //

  // Prevent double bind
  if (this.bound) {
    return
  }
  this.bound = true
}

proto.update = function (options) {
  // tapspace.capturers.KeyboardCapturer:update(options)
  //
  // Update capturer options.
  //
}

proto.unbind = function () {
  // tapspace.capturers.KeyboardCapturer:unbind()
  //
  // Remove all keyboard event listeners from the element.
  //

  if (!this.bound) {
    return
  }
  this.bound = false
}
