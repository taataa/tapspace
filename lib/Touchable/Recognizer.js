/*
Recognizer

Defines how different input devices are normalized into
pointer id, x, and y.

Keep all tapspace-related stuff in Manager.
Keep Recognizer compatible with all html elements.

Notes:
  [1] Count them the hard way to avoid difference between a possible counter
      and the actual number of pointers. An "easy" way would be to maintain
      a variable that keeps record on the number of fingers.
  [2] Clone always. Only the clone can be modified.
      Take this functional approach to avoid bugs. We experienced
      a situation where modification of the pointers caused
      suprising state changes outside of Recognizer.
*/

var clone = function (obj) {
  // Shallow object copy
  var k
  var res = {}

  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      res[k] = obj[k]
    }
  }

  return res
}

var cardinality = function (obj) {
  // Number of own properties
  var k
  var res = 0

  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      res += 1
    }
  }

  return res
}

var Recognizer = function (element, handlers, propagate) {
  // Parameters:
  //   element
  //     HTMLElement to listen to
  //   handlers
  //     start
  //       function (firstPointers), called once when the first pointer
  //       enters the screen.
  //     move
  //       function (prevPointers, nextPointers)
  //     end
  //       function (lastPointers), called once when the last pointer
  //       exits the screen.
  //   propagate
  //     bool, default false
  //       Set true if pointer events should propagate up in DOM
  //
  var self = this

  // We need to remember listeners we make to be able to remove them
  // and only them.
  this.listeners = {}
  this.element = element
  this.propagate = (typeof propagate === 'boolean' ? propagate : false)

  // Gesture started
  var started = false

  // Mouse pressed down
  var mouseDown = false

  // Current active pointers
  var currPointers = {}

  // Touch support

  var onTouchStart = function (ev) {
    var cts, i, nextPointers
    ev.preventDefault()

    if (!self.propagate) {
      ev.stopPropagation()
    }

    nextPointers = clone(currPointers) // See [2]

    cts = ev.changedTouches
    for (i = 0; i < cts.length; i += 1) {
      nextPointers[cts[i].identifier] = [cts[i].pageX, cts[i].pageY]
    }

    if (!started) {
      started = true
      handlers.start(nextPointers)
    }

    currPointers = nextPointers
  }

  var onTouchMove = function (ev) {
    var cts, i, nextPointers
    ev.preventDefault()

    if (!self.propagate) {
      ev.stopPropagation()
    }

    nextPointers = clone(currPointers)

    cts = ev.changedTouches
    for (i = 0; i < cts.length; i += 1) {
      nextPointers[cts[i].identifier] = [cts[i].pageX, cts[i].pageY]
    }

    if (started) {
      handlers.move(currPointers, nextPointers)
    }

    currPointers = nextPointers
  }

  var onTouchEndTouchCancel = function (ev) {
    var cts, i, nextPointers
    ev.preventDefault()

    if (!self.propagate) {
      ev.stopPropagation()
    }

    nextPointers = clone(currPointers)

    cts = ev.changedTouches
    for (i = 0; i < cts.length; i += 1) {
      // We assume that ending pointers are not moved from last touchmove
      // although the coordinates could be accessed via
      // ev.changedTouches[i].pageX and .pageY.
      delete nextPointers[cts[i].identifier]
    }

    // See [1]
    if (cardinality(nextPointers) < 1) {
      started = false
      // Note: we send last pointers, not the next.
      handlers.end(currPointers)
    }

    currPointers = nextPointers
  }

  // Mouse support
  // No hover support.

  var onMouseDown = function (ev) {
    var nextPointers
    ev.preventDefault()

    if (!self.propagate) {
      ev.stopPropagation()
    }

    if (!mouseDown) {
      mouseDown = true

      nextPointers = clone(currPointers) // See [2]
      nextPointers['mouse'] = [ev.pageX, ev.pageY]

      if (!started) {
        started = true
        handlers.start(nextPointers)
      }

      currPointers = nextPointers
    }
  }

  var onMouseMove = function (ev) {
    var nextPointers

    if (mouseDown) {
      ev.preventDefault()

      if (!self.propagate) {
        ev.stopPropagation()
      }

      nextPointers = clone(currPointers)
      nextPointers['mouse'] = [ev.pageX, ev.pageY]

      handlers.move(currPointers, nextPointers)

      currPointers = nextPointers
    }
  }

  var onMouseUp = function (ev) {
    var nextPointers

    if (mouseDown) {
      mouseDown = false

      ev.preventDefault()

      if (!self.propagate) {
        ev.stopPropagation()
      }

      nextPointers = clone(currPointers)
      delete nextPointers['mouse']

      // See [1]
      if (cardinality(nextPointers) < 1) {
        started = false
        // Last pointers instead of the next.
        handlers.end(currPointers)
      }

      currPointers = nextPointers
    }
  }

  this.element.addEventListener('touchstart', onTouchStart)
  this.element.addEventListener('touchmove', onTouchMove)
  this.element.addEventListener('touchend', onTouchEndTouchCancel)
  this.element.addEventListener('touchcancel', onTouchEndTouchCancel)
  this.element.addEventListener('mousedown', onMouseDown)
  this.element.addEventListener('mousemove', onMouseMove)
  this.element.addEventListener('mouseup', onMouseUp)
  this.element.addEventListener('mouseout', onMouseUp)

  this.listeners.touchstart = onTouchStart
  this.listeners.touchmove = onTouchMove
  this.listeners.touchend = onTouchEndTouchCancel
  this.listeners.touchcancel = onTouchEndTouchCancel
  this.listeners.mousedown = onMouseDown
  this.listeners.mousemove = onMouseMove
  this.listeners.mouseup = onMouseUp
  this.listeners.mouseout = onMouseUp
}

Recognizer.prototype.setPropagation = function (enabled) {
  if (typeof enabled !== 'boolean') {
    throw new Error('Invalid argument. Must be boolean, is ' + enabled)
  }
  this.propagate = enabled
}

Recognizer.prototype.destroy = function () {
  // Remove all listeners we made
  for (var k in this.listeners) {
    if (this.listeners.hasOwnProperty(k)) {
      this.element.removeEventListener(k, this.listeners[k])
    }
  }
  this.listeners = null
}

module.exports = Recognizer
