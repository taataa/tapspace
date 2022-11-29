
const TapGesture = function (source, target, options) {
  // tapspace.interaction.Tap(source, target, options)
  //
  // Tap interaction.
  //
  // Parameters:
  //   source
  //     a Plane. The tap input source.
  //     .. The source will emit 'tap' events.
  //   target
  //     a Plane. The target for the tap effect
  //   options
  //     effect
  //       TODO string, one of 'shrink', 'shake', 'down'.
  //     maxTravel
  //       optional number in viewport pixels. default 20.
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
    maxTravel: 20
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
      self.source.emit('tapstart', ev)
    }
  }
  this.ongestureend = (ev) => {
    if (self.bound) {
      if (ev.travel <= self.options.maxTravel) {
        self.source.emit('tapend', ev)
        self.source.emit('tap', ev)
      } else {
        self.source.emit('tapcancel', ev)
      }
    }
  }
  this.ongesturecancel = (ev) => {
    if (self.bound) {
      self.source.emit('tapcancel', ev)
    }
  }

  // Bind listeners to the component capturer
  this.capturer = this.source.capturer('gesture')
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}

proto.unbind = function () {
  // tapspace.interaction.Tap:unbind()
  //
  // Unbind capturer.
  //
  if (this.bound) {
    this.bound = false
    this.capturer.off('gesturstart', this.ongesturstart)
    this.capturer.off('gestureend', this.ongestureend)
    this.capturer.off('gesturecancel', this.ongesturecancel)
    this.capturer = null
    this.ongesturestart = null
    this.ongestureend = null
    this.ongesturecancel = null
  }
}
