const geom = require('affineplane')

const PinchView = function (viewport, options) {
  // tapspace.interaction.PinchView(viewport, options)
  //
  // Pinch interaction for viewports.
  // Pan, zoom, and rotate viewport planes by using pointers.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Get input form this component.
  //   options, optional object with properties:
  //     freedom
  //       optional object with props:
  //         type
  //           a string, 'TS'
  //         center
  //           a Point. The center point for the freedoms 'S', 'R', 'SR'.
  //         angle
  //           a Direction. The line angle for the freedom 'L'.
  //

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = {}
  if (!options.freedom) {
    this.options.freedom = {
      type: 'TS',
      center: null,
      angle: null
    }
  } else {
    this.options.freedom = options.freedom
  }

  // Emit events via viewport
  // TODO see if valid viewport
  this.viewport = viewport

  // Keep track of initial position of the pan so that it can be cancelled.
  this.initialTran = null

  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
}

module.exports = PinchView
const proto = PinchView.prototype

proto.bind = function () {
  // tapspace.interaction.PinchView:bind()
  //
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.ongesturestart = (ev) => {
    // Remember initial position for pan cancellation.
    self.initialTran = geom.helm3.copy(self.viewport.tran) // TODO use plane3
    // Mark as active. TODO allow custom class name
    self.viewport.element.classList.add('active-pinch')
    self.viewport.emit('pinchstart', ev)
  }

  this.ongesturemove = (ev) => {
    self.viewport.transformPlanesBy(ev.delta)
    // TODO limit travel
    self.viewport.emit('pinchmove', ev)
    self.viewport.emit('pinch', ev) // TODO needed?
  }

  this.ongestureend = (ev) => {
    // Deactivate grabbing cursor
    self.viewport.element.classList.remove('active-pinch')
    // Snap to pixel grid for pixel-perfect gesture.
    self.viewport.snapPixels({
      anchor: self.viewport.atMid()
    })
    // Emit
    self.viewport.emit('pinchend', ev)
  }

  this.ongesturecancel = (ev) => {
    // Return the viewport to the original position
    self.viewport.tran = self.initialTran
    self.initialTran = null
    self.viewport.element.classList.remove('active-pinch')
    self.viewport.renderTransform()
    self.viewport.emit('pinchcancel', ev)
  }

  const capturerOptions = {}
  if (this.options.freedom) {
    capturerOptions.freedom = this.options.freedom
  } // TODO make updateable
  const capturer = this.viewport.capturer('gesture', capturerOptions)
  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gesturemove', this.ongesturemove)
  capturer.on('gestureend', this.ongestureend)
  capturer.on('gesturecancel', this.ongesturecancel)
}

proto.getFreedom = function () {
  // tapspace.interaction.PinchView:getFreedom()
  //
  // Return
  //   object, the freedom object
  //
  return this.options.freedom
}

proto.unbind = function () {
  // tapspace.interaction.PinchView:unbind()
  //
  // Unbind listeners
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.viewport.capturer('gesture')
    capturer.off('gesturestart', this.ongesturestart)
    capturer.off('gesturemove', this.ongesturemove)
    capturer.off('gestureend', this.ongestureend)
    capturer.off('gesturecancel', this.ongesturecancel)
    this.ongesturestart = null
    this.ongesturemove = null
    this.ongestureend = null
    this.ongesturecancel = null
  }
}
