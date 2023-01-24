// TODO Provide various hold animations as effects.

const HoldGesture = function (source, target, options) {
  // @tapspace.interaction.Hold(source, target, options)
  //
  // Hold interaction. A successful hold gesture requires the user to keep
  // one or more pointers pressed calmly on the source component.
  //
  // Hold is a **time-restricted gesture**. Time-restricted gestures
  // are difficult for users to find and execute. Therefore it is
  // strongly recommended to animate or other way communicate that
  // "if you hold your pointer here longer you will see something happen".
  // Use _holdstart_ and _holdprogress_ events for that.
  //
  // Hold is also a **space-restricted gesture** as it is limited by
  // the distance the pointers are allowed to move. Therefore adjust
  // the maxTravel option to the required duration and the shakiness
  // of the environment and the motor skills of your users.
  //
  // Parameters:
  //   source
  //     a Plane. The hold input source.
  //     .. The source begins to emit hold events.
  //   target
  //     a Plane. The target for the hold effects, if any.
  //   options
  //     holdDuration
  //       optional number, default 500.
  //       .. The time in milliseconds the pointers need to stay still
  //       .. before hold event can be emitted.
  //     progressInterval
  //       optional number, default 100.
  //       The time in milliseconds between holdprogress events.
  //     maxTravel
  //       optional number, default 20.
  //       .. The travel distance in viewport pixels. If the pointers
  //       .. moves more than this, the hold gesture becomes cancelled.
  //
  // Makes the source emit:
  //   holdstart
  //     when the first pointer lands on the source.
  //   holdprogress
  //     at each progress interval until 'hold' event is emitted.
  //     The event object has properties:
  //     - component, the affine source of input.
  //     - duration, a number elapsed time in milliseconds.
  //     - progress, a number between 0..1.
  //     - travel, a number in viewport pixels. How far pointers
  //       .. traveled during the gesture.
  //   hold
  //     when the hold has lasted at least the specified duration.
  //     Emitted once. Stops emission of holdprogress.
  //   holdend
  //     when the last pointer is removed after successful hold.
  //     Requires the hold event to be emitted first.
  //   holdcancel
  //     when the last pointer is removed before successful hold
  //     .. or when the gesture travels too much to be considered a hold.
  //
  this.source = source
  this.target = target

  // Handle options
  if (typeof options !== 'object') {
    options = {}
  }
  if (typeof options.holdDuration !== 'number') {
    options.holdDuration = 500
  }
  if (typeof options.progressInterval !== 'number') {
    options.progressInterval = 100
  }
  if (typeof options.maxTravel !== 'number') {
    options.maxTravel = 20
  }
  this.options = options

  // State of binding
  this.bound = false
  this.capturer = null
  // Store event handlers for unbinding.
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Gesture state
  this.timeStart = null
  this.knownTravel = 0
  this.heldEnough = false
  this.canceled = false
  this.progressTimer = null
  this.progressTimerFn = null
}

module.exports = HoldGesture
const proto = HoldGesture.prototype

proto.bind = function () {
  // @tapspace.interaction.Hold:bind()
  //
  // Bind gesture event listeners.
  //
  if (this.bound) {
    return true
  }
  this.bound = true

  const self = this

  // Construct holdprogress timer
  this.progressTimerFn = () => {
    const elapsed = Date.now() - self.timeStart
    if (elapsed >= self.options.holdDuration) {
      self.heldEnough = true
      clearInterval(self.progressTimer)
      self.source.emit('hold', {
        component: self.source,
        duration: elapsed,
        travel: self.knownTravel
      })
    } else {
      // The holdprogress has special event object because
      // it is not synced to the gesture events.
      self.source.emit('holdprogress', {
        component: self.source,
        duration: elapsed,
        progress: elapsed / self.options.holdDuration,
        travel: self.knownTravel
      })
    }
  }

  // Construct listeners
  this.ongesturestart = (ev) => {
    if (self.bound) {
      // Reset to be sure.
      self.heldEnough = false
      self.canceled = false
      clearInterval(self.progressTimer)
      // Signal that the hold attempt begins.
      self.source.emit('holdstart', ev)
      // Record gesture begin time.
      // Events have duration property but interval is not
      // synced to events and thus we need separate time.
      self.timeStart = Date.now()
      // Record travel distance because interval not synced to events.
      self.knownTravel = ev.travel
      // Timer for holdprogress events
      self.progressTimer = setInterval(
        self.progressTimerFn,
        self.options.progressInterval
      )
    }
  }
  this.ongesturemove = (ev) => {
    if (self.bound && !self.canceled) {
      // Record travel.
      self.knownTravel = ev.travel
      // Did move too far?
      if (ev.travel > self.options.maxTravel) {
        // Moved too far.
        if (self.heldEnough) {
          // The required hold duration already passed
          // and the hold event emitted.
          // The additional travel signals the end, not cancel.
          // Note we still flag the hold as canceled but emit holdend
          // just to avoid having additional self.ended flag.
          self.canceled = true
          clearInterval(self.progressTimer) // already cleared, just ensure.
          self.source.emit('holdend', ev)
        } else {
          // Cancel hold
          self.canceled = true
          clearInterval(self.progressTimer)
          self.source.emit('holdcancel', ev)
        }
      }
    }
  }
  this.ongestureend = (ev) => {
    if (self.bound && !self.canceled) {
      if (self.heldEnough) {
        // Hold already emitted, this means the gesture ends.
        self.source.emit('holdend', ev)
      } else {
        // Held too short time.
        self.canceled = true
        clearInterval(self.progressTimer)
        self.source.emit('holdcancel', ev)
      }
    }
  }
  this.ongesturecancel = (ev) => {
    if (self.bound && !self.canceled) {
      self.canceled = true
      clearInterval(self.progressTimer)
      self.source.emit('holdcancel', ev)
      // TODO should emit holdend if hold successfully emitted
      // regardless of gesture cancel?
    }
  }

  // Bind listeners to the component capturer.
  this.capturer = this.source.capturer('gesture')
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gesturemove', this.ongesturemove)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}

proto.unbind = function () {
  // @tapspace.interaction.Hold:unbind()
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
    clearInterval(this.progressTimer)
    this.progressTimerFn = null
  }
}
