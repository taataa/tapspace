const Capturer = require('../Capturer')
const createKeydownHandler = require('./createKeydownHandler')
const createKeyupHandler = require('./createKeyupHandler')

const KeyboardCapturer = function (component, options) {
  // @KeyboardCapturer(component, options)
  //
  // Inherits Capturer
  //
  // Keyboard capturer detects keyboard events and preprocess them
  // for further interaction logic.
  //
  // Note that only focusable HTMLElements emit keyboard events.
  // Note also that while the keyboard events bubble in DOM,
  // the capturer will re-emit only those that target the captured element,
  // not any of its descendants.
  //
  // Parameters:
  //   component
  //     a Component, the source for the keyboard events
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
  this.onkeydown = null
  this.onkeyup = null
}

module.exports = KeyboardCapturer
const proto = KeyboardCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

proto.bind = function () {
  // @KeyboardCapturer:bind()
  //
  // Attach event listeners.
  //

  // Prevent double bind
  if (this.bound) {
    return
  }
  this.bound = true

  this.onkeydown = createKeydownHandler(this)
  this.onkeyup = createKeyupHandler(this)

  const target = this.component.element
  target.addEventListener('keydown', this.onkeydown)
  target.addEventListener('keyup', this.onkeyup)
}

proto.update = function (options) {
  // @KeyboardCapturer:update(options)
  //
  // Update capturer options.
  //
}

proto.unbind = function () {
  // @KeyboardCapturer:unbind()
  //
  // Remove all keyboard event listeners from the element.
  //

  if (!this.bound) {
    return
  }
  this.bound = false

  const target = this.component.element
  target.removeEventListener('keydown', this.onkeydown)
  target.removeEventListener('keyup', this.onkeyup)

  this.onkeydown = null
  this.onkeyup = null

  // The clients of the capturer could have registered listeners.
  // We close them because the capturer is destroyed.
  this.off()
}
