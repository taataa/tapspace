const onkeydown = require('./onkeydown')

const KeyboardPan = function (source, target, options) {
  // @tapspace.interactions.KeyboardPan(source, target, options)
  //
  // Parameters:
  //   source
  //     an Interactive. The keyboard input source.
  //   target
  //     a Plane. The target to apply the panning.
  //   options
  //     optional object with properties:
  //       step
  //         a Distance or a number represented in pixels on target.
  //         .. Default is 100.
  //         .. The travelling distance per key press.
  //
  // Makes the source emit:
  //   keypan
  //

  // Normalize options
  if (!options) {
    options = {}
  }
  this.step = 100
  if (typeof options.step === 'object') {
    if (options.step.transitRaw) {
      // a Distance
      this.step = options.step.transitRaw(target)
    } else {
      throw new Error('Invalid step distance')
    }
  } else if (typeof options.step === 'number') {
    this.step = options.step
  }

  this.source = source
  this.target = target

  // Keep track of listeners for unbind.
  this.onkeydown = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
  this.capturer = null
}

module.exports = KeyboardPan
const proto = KeyboardPan.prototype

proto.bind = function () {
  // @tapspace.interaction.KeyboardPan:bind()
  //
  // Bind event listeners.
  //
  if (this.bound) {
    return
  }
  this.bound = true

  // Construct handlers
  this.onkeydown = onkeydown(this)

  // Bind listeners to the component capturer.
  this.capturer = this.source.capturer('keyboard')
  this.capturer.on('keydown', this.onkeydown)
}

proto.unbind = function () {
  // @tapspace.interaction.KeyboardPan:unbind()
  //
  // Unbind listeners.
  //
  if (!this.bound) {
    return
  }
  this.bound = false

  // Unbind the interaction from the capturer.
  this.capturer.off('keydown', this.onkeydown)
  // Help garbage collector
  this.capturer = null
  this.onkeydown = null
}
