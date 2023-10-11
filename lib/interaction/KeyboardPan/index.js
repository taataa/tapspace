const onkeydown = require('./onkeydown')

const KeyboardPan = function (source, target, options) {
  // @tapspace.interactions.KeyboardPan(source, target, options)
  //
  // Translate the component by using keyboard.
  //
  // Parameters:
  //   source
  //     an InteractiveComponent. The keyboard input source.
  //   target
  //     a Transformer. The target to apply the panning.
  //   options
  //     optional object with properties:
  //       step
  //         a Distance or a number represented in pixels on target.
  //         .. Default is 100.
  //         .. The travelling distance per key press.
  //       arrows
  //         a boolean, default true. Enable arrow keys for panning.
  //       wasd
  //         a boolean, default false. Enable WASD keys for panning.
  //
  // Makes the source emit:
  //   keypan
  //

  this.source = source
  this.target = target

  // Keep track of listeners for unbind.
  this.onkeydown = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
  this.capturer = null

  // Normalize options
  this.step = 100
  this.enableArrows = true
  this.enableWasd = false
  this.update(options)
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

proto.update = require('./update')
