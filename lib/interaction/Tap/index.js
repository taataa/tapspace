
const TapGesture = function (source, target, options) {
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

  this.ongestureend = null
}

module.exports = TapGesture
const proto = TapGesture.prototype

proto.bind = function () {
  // Bind gesture event listeners.
  //
  const self = this

  this.ongestureend = (ev) => {
    if (ev.travel < self.options.maxTravel) {
      self.target.emit('tap', ev)
    }
  }

  const capturer = this.source.capturer('gesture')
  capturer.on('gestureend', this.ongestureend)
}

proto.unbind = function () {
  // Unbind capturer.
  //
  const capturer = this.source.capturer('gesture')
  capturer.off('gestureend', this.ongestureend)
  this.ongestureend = null
}
