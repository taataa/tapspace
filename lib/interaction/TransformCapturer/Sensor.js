/*
Sensor

Defines how different input devices are normalized into
pointer id, x, and y.

Keep all tapspace-related stuff in Recognizer.
Keep Sensor compatible with all html elements.

Notes:
  [1] Count them the hard way to avoid difference between a possible counter
      and the actual number of pointers. An "easy" way would be to maintain
      a variable that keeps record on the number of fingers.
  [2] Clone always. Only the clone can be modified.
      Take this functional approach to avoid bugs. We experienced
      a situation where modification of the pointers caused
      suprising state changes outside of Sensor.
*/

module.exports = function Sensor (element, handlers, opts) {
  // Parameters:
  //   element
  //     HTMLElement to listen to
  //   handlers
  //     onstart
  //       function (firstPointers), where firstPointers
  //       is a map from pointerId to [x, y].
  //       The function is called when the first pointer
  //       appears on the element.
  //     onmove
  //       function (prevPointers, nextPointers), called whenever
  //       any of the active pointers move.
  //     onend
  //       function (lastPointers), called once when
  //       the last pointer leaves the element.
  //   opts
  //     preventDefault
  //       boolean
  //

  // We need to remember the listeners we make so
  // that we are able to remove them and only them.
  let _listeners = {}

  // Use _ to emphasize private variables.
  const _handlers = handlers
  const _el = element

  // Prevent default flag can be changed with .update()
  let _preventDefault = opts.preventDefault

  // Gesture started
  let _started = false

  // Mouse pressed down. Only hovering the mouse
  // will not trigger any of the handlers.
  var _mouseDown = false

  // Current active pointers
  // A map from pointer ID to [x, y]
  let _currPointers = {}

  // Touch support

  var onTouchStart = function (ev) {
    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      const nextPointers = Object.assign({}, _currPointers) // See [2]

      const cts = ev.changedTouches
      for (let i = 0; i < cts.length; i += 1) {
        nextPointers[cts[i].identifier] = [cts[i].pageX, cts[i].pageY]
      }

      if (!_started) {
        _started = true
        _handlers.onstart(nextPointers)
      }

      _currPointers = nextPointers
    }
  }

  var onTouchMove = function (ev) {
    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      const nextPointers = Object.assign({}, _currPointers) // [2]

      const cts = ev.changedTouches
      for (let i = 0; i < cts.length; i += 1) {
        // Update only pointers that were started in this Touchable.
        // For example. ev.changedTouches contains _all_ changed touches
        // in Chrome on Android regardless of their target. See issue #87
        const id = cts[i].identifier
        if (nextPointers[id]) {
          nextPointers[id] = [cts[i].pageX, cts[i].pageY]
        }
      }

      if (_started) {
        _handlers.onmove(_currPointers, nextPointers)
      }

      _currPointers = nextPointers
    }
  }

  var onTouchEndTouchCancel = function (ev) {
    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      const nextPointers = Object.assign({}, _currPointers)

      const cts = ev.changedTouches
      for (let i = 0; i < cts.length; i += 1) {
        // We assume that ending pointers are not moved from last touchmove
        // although the coordinates could be accessed via
        // ev.changedTouches[i].pageX and .pageY.
        delete nextPointers[cts[i].identifier]
      }

      // See [1]
      if (Object.keys(nextPointers).length < 1) {
        _started = false
        // Note: we send last pointers, not the next.
        _handlers.onend(_currPointers)
      }

      _currPointers = nextPointers
    }
  }

  // Mouse support
  // No hover support.

  var onMouseDown = function (ev) {
    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      if (!_mouseDown) {
        _mouseDown = true

        const nextPointers = Object.assign({}, _currPointers) // See [2]
        nextPointers.mouse = [ev.pageX, ev.pageY]

        if (!_started) {
          _started = true
          _handlers.onstart(nextPointers)
        }

        _currPointers = nextPointers
      }
    }
  }

  const onMouseMove = function (ev) {
    if (_mouseDown && !ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      const nextPointers = Object.assign({}, _currPointers)
      nextPointers.mouse = [ev.pageX, ev.pageY]

      _handlers.onmove(_currPointers, nextPointers)

      _currPointers = nextPointers
    }
  }

  const onMouseUp = function (ev) {
    if (_mouseDown && !ev.defaultPrevented) {
      _mouseDown = false

      if (_preventDefault) {
        ev.preventDefault()
      }

      const nextPointers = Object.assign({}, _currPointers)
      delete nextPointers.mouse

      // See [1]
      if (Object.keys(nextPointers).length < 1) {
        _started = false
        // Last pointers instead of the next.
        _handlers.onend(_currPointers)
      }

      _currPointers = nextPointers
    }
  }

  // See issue #80 for explanation for 'passive: false'
  _el.addEventListener('touchstart', onTouchStart, { passive: false })
  _el.addEventListener('touchmove', onTouchMove, { passive: false })
  _el.addEventListener('touchend', onTouchEndTouchCancel)
  _el.addEventListener('touchcancel', onTouchEndTouchCancel)
  _el.addEventListener('ratstart', onMouseDown)
  _el.addEventListener('ratmove', onMouseMove)
  _el.addEventListener('ratend', onMouseUp)

  _listeners.touchstart = onTouchStart
  _listeners.touchmove = onTouchMove
  _listeners.touchend = onTouchEndTouchCancel
  _listeners.touchcancel = onTouchEndTouchCancel
  _listeners.ratstart = onMouseDown
  _listeners.ratmove = onMouseMove
  _listeners.ratend = onMouseUp

  // Bind public methods to this instead of prototype to
  // enable uglified (short) private variable names.

  this.update = function (opts) {
    _preventDefault = opts.preventDefault
  }

  this.destroy = function () {
    // Remove all listeners we made
    const keys = Object.keys(_listeners)
    let i, k
    for (i = 0; i < keys.length; i += 1) {
      k = keys[i]
      _el.removeEventListener(k, _listeners[k])
    }
    _listeners = {}
  }
}
