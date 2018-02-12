
var startMouseConversion = function (container) {
  // Re-emit mouse events as custom touch-like events, "rats".
  // The mouse events that reach the given HTMLElement are converted so
  // that the initial mouse event target el is remembered even
  // when the mouse exits it.
  // This prevents the gestureend being emitted when the mouse leaves the
  // original target, even temporarily. That brings a big improvement to
  // panning with a mouse over lots of small items.
  //

  // Mouse pressed down
  var mouseDown = false

  var originalTarget = null
  var bubbles = true
  var cancelable = true

  var onMouseDown = function (mouseEv) {
    if (!mouseDown) {
      mouseDown = true

      mouseEv.preventDefault()

      // Remember the original target
      originalTarget = mouseEv.target

      var ev = document.createEvent('Event')
      ev.initEvent('ratstart', bubbles, cancelable)

      ev.target = originalTarget
      ev.pageX = mouseEv.pageX
      ev.pageY = mouseEv.pageY

      originalTarget.dispatchEvent(ev)
    }
  }

  var onMouseMove = function (mouseEv) {
    if (mouseDown) {
      mouseEv.preventDefault()

      var ev = document.createEvent('Event')
      ev.initEvent('ratmove', bubbles, cancelable)

      ev.target = originalTarget
      ev.pageX = mouseEv.pageX
      ev.pageY = mouseEv.pageY

      originalTarget.dispatchEvent(ev)
    }
  }

  var onMouseUp = function (mouseEv) {
    if (mouseDown) {
      mouseDown = false

      mouseEv.preventDefault()

      var ev = document.createEvent('Event')
      ev.initEvent('ratend', bubbles, cancelable)

      ev.target = originalTarget
      ev.pageX = mouseEv.pageX
      ev.pageY = mouseEv.pageY

      originalTarget.dispatchEvent(ev)
      originalTarget = null
    }
  }

  // Do not let our custom events escape.
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
    container: container,
    mousedown: onMouseDown,
    mousemove: onMouseMove,
    mouseup: onMouseUp,
    mouseleave: onMouseUp,
    ratstart: stop,
    ratmove: stop,
    ratend: stop
  }
}

var stopMouseConversion = function (handlers) {
  var h = handlers
  var c = h.container

  c.removeEventListener('mousedown', h.mousedown)
  c.removeEventListener('mousemove', h.mousemove)
  c.removeEventListener('mouseup', h.mouseup)
  c.removeEventListener('mouseleave', h.mouseleave)

  c.removeEventListener('ratstart', h.ratstart)
  c.removeEventListener('ratmove', h.ratmove)
  c.removeEventListener('ratend', h.ratend)
}

var MouseConverter = function () {
  // Mapping from view ids to number of start calls.
  // We keep count to be able to remove listeners on last stop call.
  this.numRunning = {}

  // Mapping from view ids to handler bundles returned by
  this.handlers = {}
}

MouseConverter.prototype.start = function (view) {
  if (this.numRunning.hasOwnProperty(view.id)) {
    this.numRunning[view.id] += 1
    return // only increase the counter
  }

  // Init the counter
  this.numRunning[view.id] = 1

  // Begin conversion for the view.
  this.handlers[view.id] = startMouseConversion(view.getContainer())
}

MouseConverter.prototype.stop = function (view) {
  // Stops conversion when stop() is called as many
  // times as start for the view.
  if (this.numRunning.hasOwnProperty(view.id)) {
    this.numRunning[view.id] -= 1
  } else {
    throw new Error('Stop called before start.')
  }

  if (this.numRunning[view.id] < 1) {
    stopMouseConversion(this.handlers[view.id])
    delete this.numRunning[view.id]
    delete this.handlers[view.id]
  }
}

module.exports = MouseConverter
