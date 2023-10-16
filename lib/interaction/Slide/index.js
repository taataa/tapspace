const SlideGesture = function (source, target, options) {
  // @tapspace.interaction.Slide(source, target, options)
  //
  // Slide interaction. Slide is like dragging and panning but only
  // allows movement along a certain direction.
  //
  // Parameters:
  //   source
  //     an Interactive. The slide input source.
  //     .. The source will emit slide events.
  //   target
  //     a Transformer.
  //     .. The target for the slide transformation and effects.
  //   options
  //     direction
  //       optional Direction or Vector. Default to inner x-axis of the source.
  //       .. The movement is allowed only along the line
  //       .. specified by this direction.
  //     minTravel
  //       optional number in viewport pixels. Default is 5.
  //       .. The minimum pointer travel required
  //       .. for the slide to begin. Set zero or negative for the slide to
  //       .. begin immediately at the first pointer.
  //
  // Makes the source emit:
  //   slidestart
  //     when the slide begins and the minimum travel distance has occurred.
  //   slidemove
  //     when the slide has started and one or more pointers move the item.
  //   slideend
  //     when the last pointer leaves the slidable item.
  //     .. The slide is complete.
  //   slidecancel
  //     when slide was cancelled. The item state should revert back
  //     .. to the state before sliding.
  //   slide
  //     alias of slidemove
  //

  // TODO support Distance in minTravel.
  // TODO maxTravel

  this.source = source
  this.target = target

  // Handle options
  this.options = {}
  if (typeof options !== 'object') {
    options = {}
  }
  if (typeof options.direction === 'object') {
    this.options.direction = options.direction
  } else {
    this.options.direction = source.createDirection(0)
  }
  if (typeof options.minTravel === 'number') {
    this.options.minTravel = options.minTravel
  } else {
    this.options.minTravel = 5
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

module.exports = SlideGesture
const proto = SlideGesture.prototype

proto.bind = function () {
  // @tapspace.interaction.Slide:bind()
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

  const self = this

  const projectDeltaToDir = (delta) => {
    // From the given transform, take translation component as a vector and
    // take the component vector
    // parallel to the slide direction.
    const v = delta.getVector()
    const vdir = self.options.direction.getVector(1)
    const magn = vdir.dot(v)
    return self.options.direction.getVector(magn)
  }

  this.ongesturestart = (ev) => {
    if (self.bound) {
      if (ev.travel >= self.options.minTravel) {
        self.begun = true
        self.source.emit('slidestart', ev)
      }
    }
  }
  this.ongesturemove = (ev) => {
    if (self.bound) {
      if (self.begun) {
        const trip = projectDeltaToDir(ev.delta)
        self.target.translateBy(trip)
        self.source.emit('slidemove', ev)
        self.source.emit('slide', ev)
      } else {
        if (ev.travel >= self.options.minTravel) {
          const trip = projectDeltaToDir(ev.delta)
          self.target.translateBy(trip)
          // TODO include travel this far to the trip?
          self.begun = true
          self.source.emit('slidestart', ev)
        }
      }
    }
  }
  this.ongestureend = (ev) => {
    if (self.bound && self.begun) {
      self.begun = false
      self.source.emit('slideend', ev)
    }
  }
  this.ongesturecancel = (ev) => {
    if (self.bound && self.begun) {
      self.begun = false
      self.source.emit('slidecancel', ev)
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
  // @tapspace.interaction.Slide:unbind()
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
