
const TapGesture = function (source, target, options) {
  // tapspace.interaction.Tap(source, target, options)
  //
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
  // Makes the target emit:
  //   tapstart
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
    maxTravel: 20
  }, options)

  // Rememver event handlers for unbinding
  this.bound = false
  this.ongestureend = null
}

module.exports = TapGesture
const proto = TapGesture.prototype

proto.bind = function () {
  // tapspace.interaction.Tap:bind()
  //
  // Bind gesture event listeners.
  //
  if (this.bound) {
    return true
  }
  this.bound = true

  const self = this

  // Construct listeners
  this.ongesturestart = (ev) => {
    if (self.bound) {
      self.target.emit('tapstart', ev)
    }
  }
  this.ongestureend = (ev) => {
    if (self.bound) {
      if (ev.travel < self.options.maxTravel) {
        self.target.emit('tapend', ev)
        self.target.emit('tap', ev)
      } else {
        self.target.emit('tapcancel', ev)
      }
    }
  }
  this.ongesturecancel = (ev) => {
    if (self.bound) {
      self.target.emit('tapcancel', ev)
    }
  }
  // Bind listeners to the component capturer
  const capturer = this.source.capturer('gesture')
  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gestureend', this.ongestureend)
  capturer.on('gesturecancel', this.ongesturecancel)
}

proto.unbind = function () {
  // tapspace.interaction.Tap:unbind()
  //
  // Unbind capturer.
  //
  if (this.bound) {
    this.bound = false
    const capturer = this.source.capturer('gesture')
    capturer.off('gesturstart', this.ongesturstart)
    capturer.off('gestureend', this.ongestureend)
    capturer.off('gesturecancel', this.ongesturecancel)
    this.ongestureend = null
  }
}
