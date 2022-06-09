
const TapGesture = function (source, target, options) {
  // Tap interaction.
  //
  // Parameters:
  //   source
  //     a Component. The tap input source.
  //   target
  //     a Component. The target for the tap effect.
  //     The target will emit 'tap' events.
  //   options
  //     effect
  //       string, one of 'shrink', 'shake', 'down'
  //     maxTravel
  //       optional number in viewport pixels. default 20.
  //
  this.source = source
  this.target = target

  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    maxTravel: 20
  }, options)

  // Rememver event handlers for unbinding
  this.bound = false
  this.ongestureend = null
}

module.exports = TapGesture
const proto = TapGesture.prototype

proto.bind = function () {
  // Bind gesture event listeners.
  //
  if (this.bound) {
    return true
  }
  this.bound = true

  const self = this

  // Construct listeners
  this.ongestureend = (ev) => {
    if (self.bound) {
      if (ev.travel < self.options.maxTravel) {
        self.target.emit('tap', ev)
      }
    }
  }
  // Bind listeners to the component capturer
  const capturer = this.source.capturer('gesture')
  capturer.on('gestureend', this.ongestureend)
}

proto.unbind = function () {
  // Unbind capturer.
  //
  if (this.bound) {
    this.bound = false
    const capturer = this.source.capturer('gesture')
    capturer.off('gestureend', this.ongestureend)
    this.ongestureend = null
  }
}
