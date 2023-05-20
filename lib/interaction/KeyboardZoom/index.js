const onkeydown = require('./onkeydown')
const applicators = require('./applicators')

const KeyboardZoom = function (source, target, options) {
  // @tapspace.interactions.KeyboardZoom(source, target, options)
  //
  // Make the viewport zoom in and out, relative to the target.
  //
  // Parameters:
  //   source
  //     an InteractiveComponent. The keyboard input source.
  //   target
  //     a TransformerComponent. The target to zoom towards.
  //   options
  //     optional object with properties:
  //       step
  //         a dilation factor per button press. For example: 1.5.
  //         If target is 3D, will translate along z instead of scaling.
  //       plusMinus
  //         a boolean, default true
  //
  // Makes the source emit:
  //   keyzoom
  //

  // Normalize options
  if (!options) {
    options = {}
  }
  this.step = 1.5
  if (typeof options.step === 'number') {
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

proto.applyTransform = require('./applyTransform')

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
