/*
Sensor

Defines how different input devices are normalized into
pointer id, x, and y.

Keep all tapspace-related stuff in Recognizer.
Keep Sensor compatible with all html elements.

Notes:
  [1] Count them the hard way to avoid difference between a possible counter
      and the actual number of pointers. An "easy" way would be to maintain
      a variable that keeps record on the number of fingers. That variable
      is prone to bugs.
  [2] Clone always. Only the clone can be modified.
      Take this functional approach to avoid bugs. We experienced
      a situation where modification of the pointers caused
      suprising state changes outside of Sensor.
  [3] When is the default prevention necessary?
      To prevent browser built-in features, such as drag-n-drop on images.
      Users might need the built-in features.
      Does Sensor record default-prevented events?
      What if a child component, for example a submit button, emits
       a gesture-like event sequence?
      What if it has a user-defiend click handler that
       prevents the form submission?
      What if we have a moveable go board and moveable stones.
      Should a stone move move the board also? No.
      Should the board move be considered "a default action"?
      How the stone can prevent the board from moving? Stop propagation?
      Is the event consumed by the stone?
      Or is it just passed up until DOM root?
      About stopPropagation vs preventDefault:
       https://stackoverflow.com/q/5963669/638546
      About stopPropagation usage:
       https://stackoverflow.com/q/1464482/638546
      About stopPropagation dangers:
       https://css-tricks.com/dangers-stopping-event-propagation/
      Usage of stopPropagation might have a tiny performance benefit.
      Usage of stopPropagation might prevent closing a menu
       if the menu depends on root html element receiving a click event.
      Default prevention can work for two ends: To prevent browser behaviour
       and to signal that the event has been handled.
      In the go board example, the stone moving could signal that it is handled
       by calling prevent default.
*/

const Sensor = function (element, handlers, opts) {
  // Sensor class. Support Pointer Event API
  //
  // Parameters:
  //   element
  //     HTMLElement to listen to.
  //   handlers
  //     onstart
  //       function (firstPointers), where firstPointers
  //       .. is a map from pointerId to {x, y, target}, where
  //       .. x and y are coordinates on page, and target is HTMLElement.
  //       The function is called when the first pointer
  //       .. appears on the element.
  //     onmove
  //       function (prevPointers, nextPointers), called whenever
  //       .. any of the active pointers move.
  //     onend
  //       function (lastPointers), called once when
  //       .. the last pointer leaves the element.
  //     oncancel
  //       function (lastPointers), called once if
  //       .. the last pointer on the element cancels.
  //       If the gesture cancel, onend is not called.
  //   opts
  //     preventDefault
  //       boolean, default true. True will prevent both
  //         browser drag-n-drop file system copy operations
  //         .. and parent plane interaction.
  //     stopPropagation
  //       boolean, default false. False lets browser pointer events to
  //         .. propagate higher in DOM, for example to pan the viewport
  //         .. or to close a Bootstrap dropdown menu. To prevent viewport
  //         .. panning, usage of preventDefault is recommended instead of
  //         .. stopping the propagation due to possible side effects.
  //
  const self = this

  // Default options
  if (!opts) {
    opts = {}
  }
  this.options = Object.assign({
    preventDefault: true,
    stopPropagation: false
  }, opts)

  // We need to remember the listeners we make so
  // that we are able to remove them and only them.
  this.onpointerdown = null
  this.onpointermove = null
  this.onpointerup = null
  this.onpointercancel = null

  this.element = element

  this.onstart = handlers.onstart
  this.onmove = handlers.onmove
  this.onend = handlers.onend
  this.oncancel = handlers.oncancel

  // Gesture started
  this.started = false

  // Current active pointers
  // A map from ev.pointerId to {x, y}
  this.currPointers = {}

  this.onpointerdown = function (ev) {
    // A new pointer appears.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (self.options.preventDefault) {
      ev.preventDefault()
    }
    if (self.options.stopPropagation) {
      ev.stopPropagation()
    }

    // Make mouse behave as touch: capture the pointer.
    // Browsers call releasePointerCapture automatically on up or leave.
    // Note use of ev.target instead of self.element. This way click and other
    // events on the descendants of self.element are not stolen and the events
    // propagate through as expected.
    ev.target.setPointerCapture(ev.pointerId)

    // Register the new pointer.
    const nextPointers = Object.assign({}, self.currPointers) // See [2]
    // Store the coordinate.
    nextPointers[ev.pointerId] = {
      x: ev.pageX,
      y: ev.pageY,
      target: ev.target
    }

    // Declare the gesture as started.
    if (!self.started) {
      self.started = true
      // Send the sensed pointers to the gesture capturer.
      self.onstart(nextPointers)
    }

    self.currPointers = nextPointers
  }

  this.onpointermove = function (ev) {
    // A pointer moves while down.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    // Shortcircuit if not started.
    if (!self.started) { return }

    // Shortcircuit if no such pointer
    if (!self.currPointers[ev.pointerId]) { return }

    if (self.options.preventDefault) {
      ev.preventDefault()
    }
    if (self.options.stopPropagation) {
      ev.stopPropagation()
    }

    const nextPointers = Object.assign({}, self.currPointers) // [2]
    if (nextPointers[ev.pointerId]) {
      nextPointers[ev.pointerId] = {
        x: ev.pageX,
        y: ev.pageY,
        target: ev.target
      }
    }

    // TODO maybe call in a non-blocking way
    self.onmove(self.currPointers, nextPointers)

    self.currPointers = nextPointers
  }

  this.onpointerup = function (ev) {
    // A pointer is lifted.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    // Shortcircuit if not started.
    if (!self.started) { return }

    // Shortcircuit if no such pointer.
    // Happens when both pointerup and pointerleave fire.
    if (!self.currPointers[ev.pointerId]) { return }

    if (self.options.preventDefault) {
      ev.preventDefault()
    }
    if (self.options.stopPropagation) {
      ev.stopPropagation()
    }

    const nextPointers = Object.assign({}, self.currPointers)
    // Remove the ending pointer from the set.
    delete nextPointers[ev.pointerId]
    // We assume that ending pointers are not moved from last touchmove
    // although the coordinates could be accessed via
    // ev.changedTouches[i].pageX and .pageY.

    // Declare gesture as ended when there are no pointers left.
    // See also [1] on why Object.keys is used here to avoid bugs.
    if (Object.keys(nextPointers).length < 1) {
      self.started = false
      // Note: we send last pointers, not the next cuz empty.
      self.onend(self.currPointers)
    }

    // The remaining pointers become the current pointers.
    self.currPointers = nextPointers
  }

  this.onpointercancel = function (ev) {
    // A pointer is cancelled, e.g. a device is disconnected.
    // A recommendation for cancelling is that the effect of the pointer
    // is discarded. However, the sensor cannot know what the gesture does.
    // Therefore it probably a good compromise to keep the gesture going
    // regardless of cancelled pointers until the last pointer.
    // If the last pointer cancels, then we announce the gesture as cancelled.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    // Shortcircuit if not started.
    if (!self.started) { return }

    // Shortcircuit if no such pointer
    if (!self.currPointers[ev.pointerId]) { return }

    if (self.options.preventDefault) {
      ev.preventDefault()
    }
    if (self.options.stopPropagation) {
      ev.stopPropagation()
    }

    const nextPointers = Object.assign({}, self.currPointers)
    // Remove the cancelled pointer from the set.
    delete nextPointers[ev.pointerId]

    // Declare whole gesture as cancelled if the last pointer cancels.
    // See also [1] on why Object.keys is used here to avoid bugs.
    if (Object.keys(nextPointers).length < 1) {
      self.started = false
      // Note: we send the last pointers, with the cancelled pointer,
      // not the empty next pointers object.
      self.oncancel(self.currPointers)
    }

    // The remaining pointers become the current pointers.
    self.currPointers = nextPointers
  }

  // DEBUG
  // const log = evName => ev => console.log(evName, ev)
  // this.element.addEventListener('pointerover', log('pointerover'))
  // this.element.addEventListener('pointerenter', log('pointerenter'))
  // this.element.addEventListener('pointerdown', log('pointerdown'))
  // this.element.addEventListener('pointermove', log('pointermove'))
  // this.element.addEventListener('pointerup', log('pointerup'))
  // this.element.addEventListener('pointercancel', log('pointercancel'))
  // this.element.addEventListener('pointerout', log('pointerout'))
  // this.element.addEventListener('pointerleave', log('pointerleave'))

  // See issue #80 for explanation for 'passive: false'.
  // Basically, passive:true gives browsers a promise that the default is
  // not prevented. In Tapspace, we need to be able to prevent the default
  // behaviour of browser and the parent space components.
  // Therefore we set active listeners. Although active listeners are
  // the default for addEventListener, browsers ask to be expicit about it
  // when scroll-blocking events are listened.
  const lopts = { capture: false, passive: false }
  this.element.addEventListener('pointerdown', this.onpointerdown, lopts)
  this.element.addEventListener('pointermove', this.onpointermove, lopts)
  this.element.addEventListener('pointerup', this.onpointerup, lopts)
  this.element.addEventListener('pointercancel', this.onpointercancel, lopts)
  // Without setPointerCapture we would need to track when mouse exits
  // the viewport because we would be unable to hear the pointerup.
  // this.element.addEventListener('pointerleave', this.onpointerup, lopts)
}

module.exports = Sensor
const proto = Sensor.prototype

proto.update = function (opts) {
  // Parameters
  //   opts
  //     preventDefault, optional boolean
  //     stopPropagation, optional boolean
  //
  this.options = Object.assign({
    preventDefault: this.options.preventDefault,
    stopPropagation: this.options.stopPropagation
  }, opts)
}

proto.unbind = function () {
  // Remove all listeners we made
  this.element.removeEventListener('pointerdown', this.onpointerdown)
  this.element.removeEventListener('pointermove', this.onpointermove)
  this.element.removeEventListener('pointerup', this.onpointerup)
  this.element.removeEventListener('pointercancel', this.onpointercancel)
  this.onpointerdown = null
  this.onpointermove = null
  this.onpointerup = null
  this.onpointercancel = null
}
