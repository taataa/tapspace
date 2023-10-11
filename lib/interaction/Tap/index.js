const TapGesture = function (source, target, options) {
  // @tapspace.interaction.Tap(source, target, options)
  //
  // Tap interaction.
  //
  // Parameters:
  //   source
  //     an InteractiveComponent. The tap input source.
  //     .. The source will emit 'tap' events.
  //   target
  //     a Transformer. The target for the optional tap effect.
  //   options
  //     effect
  //       TODO string, one of 'shrink', 'shake', 'down'.
  //     maxTravel
  //       optional number in viewport pixels. default 20.
  //     preventDefault
  //       optional boolean. Think as 'final'. True to mark the events
  //       .. as handled and prevent further interaction in bubbling.
  //       .. False to let the ancestors interact too. Default is true.
  //
  // Makes the source emit:
  //   tapstart
  //     when the first pointer enters the element.
  //   tapend
  //     when the tap gesture ends succesfully, before the tap event.
  //   tapcancel
  //     when the tap gesture was cancelled or unsuccessful.
  //     The gesture is unsuccessful if the gesture requirements were not met.
  //   tap
  //     when the tap was successful.
  //
  this.source = source
  this.target = target

  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    maxTravel: 20,
    preventDefault: true
  }, options)

  // Remember event handlers for unbinding
  this.bound = false
  this.capturer = null
  this.ongesturestart = null
  this.ongestureend = null
  this.ongesturecancel = null
}

module.exports = TapGesture
const proto = TapGesture.prototype
proto.isTap = true

proto.bind = require('./bind')
proto.unbind = require('./unbind')
proto.update = require('./update')
