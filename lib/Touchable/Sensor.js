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
var utils = require('./utils')

module.exports = function Sensor (element, handlers, opts) {
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
  //   opts
  //     preventDefault
  //       boolean

  // We need to remember listeners we make to be able to remove them
  // and only them.
  var _listeners = {}

  // Use _ to emphasize private variables.
  var _preventDefault = opts.preventDefault
  var _handlers = handlers
  var _el = element

  // Gesture started
  var _started = false

  // Mouse pressed down
  var _mouseDown = false

  // Current active pointers
  var _currPointers = {}

  // Touch support

  var onTouchStart = function (ev) {
    var cts, i, nextPointers

    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      nextPointers = utils.clone(_currPointers) // See [2]

      cts = ev.changedTouches
      for (i = 0; i < cts.length; i += 1) {
        nextPointers[cts[i].identifier] = [cts[i].pageX, cts[i].pageY]
      }

      if (!_started) {
        _started = true
        _handlers.start(nextPointers)
      }

      _currPointers = nextPointers
    }
  }

  var onTouchMove = function (ev) {
    var cts, i, id, nextPointers

    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      nextPointers = utils.clone(_currPointers)

      cts = ev.changedTouches
      for (i = 0; i < cts.length; i += 1) {
        // Update only pointers that were started in this Touchable.
        // For example. ev.changedTouches contains _all_ changed touches
        // in Chrome on Android regardless of their target. See issue #87
        id = cts[i].identifier
        if (nextPointers.hasOwnProperty(id)) {
          nextPointers[id] = [cts[i].pageX, cts[i].pageY]
        }
      }

      if (_started) {
        _handlers.move(_currPointers, nextPointers)
      }

      _currPointers = nextPointers
    }
  }

  var onTouchEndTouchCancel = function (ev) {
    var cts, i, nextPointers

    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      nextPointers = utils.clone(_currPointers)

      cts = ev.changedTouches
      for (i = 0; i < cts.length; i += 1) {
        // We assume that ending pointers are not moved from last touchmove
        // although the coordinates could be accessed via
        // ev.changedTouches[i].pageX and .pageY.
        delete nextPointers[cts[i].identifier]
      }

      // See [1]
      if (utils.cardinality(nextPointers) < 1) {
        _started = false
        // Note: we send last pointers, not the next.
        _handlers.end(_currPointers)
      }

      _currPointers = nextPointers
    }
  }

  // Mouse support
  // No hover support.

  var onMouseDown = function (ev) {
    var nextPointers

    if (!ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      if (!_mouseDown) {
        _mouseDown = true

        nextPointers = utils.clone(_currPointers) // See [2]
        nextPointers['mouse'] = [ev.pageX, ev.pageY]

        if (!_started) {
          _started = true
          _handlers.start(nextPointers)
        }

        _currPointers = nextPointers
      }
    }
  }

  var onMouseMove = function (ev) {
    var nextPointers

    if (_mouseDown && !ev.defaultPrevented) {
      if (_preventDefault) {
        ev.preventDefault()
      }

      nextPointers = utils.clone(_currPointers)
      nextPointers['mouse'] = [ev.pageX, ev.pageY]

      _handlers.move(_currPointers, nextPointers)

      _currPointers = nextPointers
    }
  }

  var onMouseUp = function (ev) {
    var nextPointers

    if (_mouseDown && !ev.defaultPrevented) {
      _mouseDown = false

      if (_preventDefault) {
        ev.preventDefault()
      }

      nextPointers = utils.clone(_currPointers)
      delete nextPointers['mouse']

      // See [1]
      if (utils.cardinality(nextPointers) < 1) {
        _started = false
        // Last pointers instead of the next.
        _handlers.end(_currPointers)
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
    for (var k in _listeners) {
      if (_listeners.hasOwnProperty(k)) {
        _el.removeEventListener(k, _listeners[k])
      }
    }
    _listeners = null
  }
}
