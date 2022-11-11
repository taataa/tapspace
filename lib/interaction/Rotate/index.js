
const RotateGesture = function (source, target, options) {
  // tapspace.interaction.Rotate(source, target, options)
  //
  // Rotating interaction.
  //
  // Parameters:
  //   source
  //     a Component. The input source.
  //   target
  //     a Component. The target for the rotating effect.
  //     .. The target will emit rotate events.
  //   options
  //     center
  //       optional Point.
  //
  // Makes the target emit:
  //   rotatestart
  //     when the rotation begins.
  //   rotatemove
  //     when one or more pointers rotate the item.
  //   rotateend
  //     when the last pointer leaves the item. The gesture is now completed.
  //   rotatecancel
  //     when the gesture was cancelled. The item state should revert back
  //     .. to the state before rotation.
  //   rotate
  //     alias of rotatemove
  //

  // TODO minTravel
  // TODO maxTravel

  this.source = source
  this.target = target

  // Handle options
  this.options = {}
  if (typeof options !== 'object') {
    options = {}
  }
  if (typeof options.center === 'object') {
    this.options.center = options.center
  } else {
    this.options.center = null // TODO
  }

  // Track if interaction is bound. Just a safeguard.
  this.bound = false
  this.capturer = null
  // Store event handlers for unbinding.
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Gesture state
  this.begun = false
}

module.exports = RotateGesture
const proto = RotateGesture.prototype

proto.bind = function () {
  // tapspace.interaction.Rotate:bind()
  //
  // Bind gesture event listeners.
  //
  // Return
  //   a boolean. True if already bound.
  //

  if (this.bound) {
    return true
  }
  this.bound = true

  // Pass this for handlers.
  const self = this

  this.ongesturestart = (ev) => {
    if (self.bound) {
      self.begun = true
      self.target.emit('rotatestart', ev)
    }
  }
  this.ongesturemove = (ev) => {
    if (self.bound) {
      if (self.begun) {
        const rot = ev.delta.getRotation()
        console.log('rot', rot)
        self.target.transformBy(rot)
        self.target.emit('rotatemove', ev)
        self.target.emit('rotate', ev)
      }
    }
  }
  this.ongestureend = (ev) => {
    if (self.bound && self.begun) {
      self.begun = false
      self.target.emit('rotateend', ev)
    }
  }
  this.ongesturecancel = (ev) => {
    if (self.bound && self.begun) {
      self.begun = false
      self.target.emit('rotatecancel', ev)
    }
  }

  // Bind listeners to the capturer
  this.capturer = this.source.capturer('gesture')
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gesturemove', this.ongesturemove)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}

proto.unbind = function () {
  // tapspace.interaction.Rotate:unbind()
  //
  // Unbind capturer.
  //
  if (this.bound) {
    this.bound = false
    this.capturer.off('gesturstart', this.ongesturstart)
    this.capturer.off('gesturemove', this.ongesturemove)
    this.capturer.off('gestureend', this.ongestureend)
    this.capturer.off('gesturecancel', this.ongesturecancel)
    this.capturer = null
    this.ongesturestart = null
    this.ongesturemove = null
    this.ongestureend = null
    this.ongesturecancel = null
    // Reset state
    this.begun = false
  }
}
