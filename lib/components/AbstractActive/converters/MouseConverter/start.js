module.exports = (container) => {
  // Start mouse conversion.
  // Re-emit mouse events as custom touch-like events, "rats".
  // The mouse events that reach the given HTMLElement are converted so
  // that the initial mouse event target el is remembered even
  // when the mouse exits it.
  // This prevents the gestureend being emitted when the mouse leaves the
  // original target, even temporarily. That brings a big improvement to
  // panning with a mouse over lots of small items.
  //
  // Parameters
  //   container
  //     HTMLElement
  //

  // Mouse pressed down
  var mouseDown = false

  var originalTarget = null
  var bubbles = true
  var cancelable = true

  var onMouseDown = function (mouseEv) {
    if (!mouseDown && !mouseEv.defaultPrevented) {
      mouseDown = true

      // Remember the original target
      originalTarget = mouseEv.target

      // Construct the event
      var ev = document.createEvent('Event')
      ev.initEvent('ratstart', bubbles, cancelable)

      ev.target = originalTarget
      ev.pageX = mouseEv.pageX
      ev.pageY = mouseEv.pageY

      // Dispatch the rat. If it was cancelled, cancel also the original.
      var defaultPrevented = !originalTarget.dispatchEvent(ev)
      if (defaultPrevented) {
        mouseEv.preventDefault()
      }
    }
  }

  var onMouseMove = function (mouseEv) {
    if (mouseDown && !mouseEv.defaultPrevented) {
      // Construct the rat event
      var ev = document.createEvent('Event')
      ev.initEvent('ratmove', bubbles, cancelable)

      ev.target = originalTarget
      ev.pageX = mouseEv.pageX
      ev.pageY = mouseEv.pageY

      // Dispatch the rat. If it was cancelled, cancel also the original.
      var defaultPrevented = !originalTarget.dispatchEvent(ev)
      if (defaultPrevented) {
        mouseEv.preventDefault()
      }
    }
  }

  var onMouseUp = function (mouseEv) {
    if (mouseDown && !mouseEv.defaultPrevented) {
      mouseDown = false

      var ev = document.createEvent('Event')
      ev.initEvent('ratend', bubbles, cancelable)

      ev.target = originalTarget
      ev.pageX = mouseEv.pageX
      ev.pageY = mouseEv.pageY

      // Dispatch the rat. If it was cancelled, cancel also the original.
      var defaultPrevented = !originalTarget.dispatchEvent(ev)
      if (defaultPrevented) {
        mouseEv.preventDefault()
      }

      // Forget the target. Just to be sure.
      originalTarget = null
    }
  }

  // Do not let our custom rat events escape.
  // Note that stopPropagation does not affect
  // the return value of dispatchEvent. Therefore
  // the original mouse events become cancelled
  // only if the rat events are explicitly cancelled.
  // Note terminology: cancel = preventDefault.
  var stop = function (customEvent) {
    customEvent.stopPropagation()
  }

  container.addEventListener('mousedown', onMouseDown)
  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('mouseup', onMouseUp)
  container.addEventListener('mouseleave', onMouseUp)

  container.addEventListener('ratstart', stop)
  container.addEventListener('ratmove', stop)
  container.addEventListener('ratend', stop)

  // Return handlers so that the listeners can be removed.
  return {
    onmousedown: onMouseDown,
    onmousemove: onMouseMove,
    onmouseup: onMouseUp,
    onmouseleave: onMouseUp,
    onratstart: stop,
    onratmove: stop,
    onratend: stop
  }
}
