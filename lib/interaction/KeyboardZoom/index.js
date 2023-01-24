const onkeydown = require('./onkeydown')

const KeyboardZoom = function (source, target, options) {
  // @tapspace.interactions.KeyboardZoom(source, target, options)
  //
  // Make the viewport zoom in and out, relative to the target.
  //
  // Parameters:
  //   source
  //     an Interactive. The keyboard input source.
  //   target
  //     a Plane. The target to zoom towards.
  //   options
  //     optional object with properties:
  //       step
  //         a Distance or a number represented in pixels on target.
  //         .. Default is 100.
  //         .. The travelling distance per key press.
  //
  // Makes the source emit:
  //   keyzoom
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

module.exports = KeyboardZoom
const proto = KeyboardZoom.prototype

proto.bind = function () {
  // @tapspace.interaction.KeyboardZoom:bind()
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
  // @tapspace.interaction.KeyboardZoom:unbind()
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
