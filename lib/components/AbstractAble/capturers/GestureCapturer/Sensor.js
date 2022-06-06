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

module.exports = function Sensor (element, handlers, opts) {
  // Parameters:
  //   element
  //     HTMLElement to listen to
  //   handlers
  //     onstart
  //       function (firstPointers), where firstPointers
  //       is a map from pointerId to {x, y}.
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
  //       boolean, default true. True will prevent both
  //         browser drag-n-drop file system copy operations
  //         and parent plane interaction.
  //     stopPropagation
  //       boolean, default false. False lets browser pointer events to
  //         propagate higher in DOM, for example to pan the viewport
  //         or to close a Bootstrap dropdown menu. To prevent viewport
  //         panning, usage of preventDefault is recommended instead of
  //         stopping the propagation due to possible side effects.
  //

  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    preventDefault: true,
    stopPropagation: false
  })

  // We need to remember the listeners we make so
  // that we are able to remove them and only them.
  let _listeners = {}

  // Use _ to emphasize private variables.
  const _handlers = handlers
  const _el = element

  // The option flags can be changed with .update()
  let _preventDefault = opts.preventDefault
  let _stopPropagation = opts.stopPropagation

  // Gesture started
  let _started = false

  // Mouse pressed down. Only hovering the mouse
  // will not trigger any of the handlers.
  let _mouseDown = false

  // Current active pointers
  // A map from pointer ID to [x, y]
  let _currPointers = {}

  // Touch support

  const onTouchStart = function (ev) {
    // A new touch point appears.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (_preventDefault) {
      ev.preventDefault()
    }
    if (_stopPropagation) {
      ev.stopPropagation()
    }

    // Register pointers
    const nextPointers = Object.assign({}, _currPointers) // See [2]
    // Store their pageX and pageY coordinates.
    const cts = ev.changedTouches
    for (let i = 0; i < cts.length; i += 1) {
      const touch = cts[i]
      nextPointers[touch.identifier] = {
        x: touch.pageX,
        y: touch.pageY
      }
    }

    // Declare the gesture as started.
    if (!_started) {
      _started = true
      // Send the sensed pointers to the gesture capturer.
      _handlers.onstart(nextPointers)
    }

    _currPointers = nextPointers
  }

  const onTouchMove = function (ev) {
    // A known touch point moves.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (_preventDefault) {
      ev.preventDefault()
    }
    if (_stopPropagation) {
      ev.stopPropagation()
    }

    if (_started) {
      const nextPointers = Object.assign({}, _currPointers) // [2]

      const cts = ev.changedTouches
      for (let i = 0; i < cts.length; i += 1) {
        // Update only pointers that were started in this Touchable.
        // For example. ev.changedTouches contains _all_ changed touches
        // in Chrome on Android regardless of their target. See issue #87
        const touch = cts[i]
        const id = touch.identifier
        if (nextPointers[id]) {
          nextPointers[id] = { x: touch.pageX, y: touch.pageY }
        }
      }

      _handlers.onmove(_currPointers, nextPointers)

      _currPointers = nextPointers
    }
  }

  const onTouchEndTouchCancel = function (ev) {
    // A known touch point ends.

    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (_preventDefault) {
      ev.preventDefault()
    }
    if (_stopPropagation) {
      ev.stopPropagation()
    }

    if (_started) {
      const nextPointers = Object.assign({}, _currPointers)

      // Delete the pointer from the set when it ends or cancels.
      // TODO does this miss the last microtransform?
      const cts = ev.changedTouches
      for (let i = 0; i < cts.length; i += 1) {
        // We assume that ending pointers are not moved from last touchmove
        // although the coordinates could be accessed via
        // ev.changedTouches[i].pageX and .pageY.
        delete nextPointers[cts[i].identifier]
      }

      // Declare gesture as ended when there are no pointers left.
      // See also [1] on why Object.keys is used here to avoid bugs.
      if (Object.keys(nextPointers).length < 1) {
        _started = false
        // Note: we send last pointers, not the next.
        _handlers.onend(_currPointers)
      }

      // The remaining pointers become the current pointers.
      _currPointers = nextPointers
    }
  }

  // Mouse support
  // No hover support.

  const onMouseDown = function (ev) {
    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (_preventDefault) {
      ev.preventDefault()
    }
    if (_stopPropagation) {
      ev.stopPropagation()
    }

    if (!_mouseDown) {
      _mouseDown = true

      const nextPointers = Object.assign({}, _currPointers) // See [2]
      nextPointers.mouse = { x: ev.pageX, y: ev.pageY }

      if (!_started) {
        _started = true
        _handlers.onstart(nextPointers)
      }

      _currPointers = nextPointers
    }
  }

  const onMouseMove = function (ev) {
    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (_preventDefault) {
      ev.preventDefault()
    }
    if (_stopPropagation) {
      ev.stopPropagation()
    }

    if (_started && _mouseDown) {
      const nextPointers = Object.assign({}, _currPointers)
      nextPointers.mouse = { x: ev.pageX, y: ev.pageY }

      _handlers.onmove(_currPointers, nextPointers)

      _currPointers = nextPointers
    }
  }

  const onMouseUp = function (ev) {
    // Shortcircuit if event is handled. See [3].
    if (ev.defaultPrevented) { return }

    if (_preventDefault) {
      ev.preventDefault()
    }
    if (_stopPropagation) {
      ev.stopPropagation()
    }

    if (_started && _mouseDown) {
      _mouseDown = false

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
    // Parameters
    //   opts
    //     preventDefault
    //     stopPropagation
    //
    opts = Object.assign({
      preventDefault: _preventDefault,
      stopPropagation: _stopPropagation
    }, opts)
    _preventDefault = opts.preventDefault
    _stopPropagation = opts.stopPropagation
  }

  this.unbind = function () {
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
