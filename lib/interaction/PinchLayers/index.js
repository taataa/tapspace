const geom = require('affineplane')

const PinchLayers = function (viewport, options) {
  // tapspace.interaction.PinchLayers(viewport, options)
  //
  // Pinch interaction for viewports.
  // Pan, zoom, and rotate viewport layers by using pointers.
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
  this.initialPlane = null

  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
}

module.exports = PinchLayers
const proto = PinchLayers.prototype

proto.bind = function () {
  // tapspace.interaction.PinchLayers:bind()
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
    self.initialPlane = geom.plane3.copy(self.viewport.plane)
    // Mark as active. TODO allow custom class name
    self.viewport.element.classList.add('active-pinch')
    self.viewport.emit('pinchstart', ev)
  }

  this.ongesturemove = (ev) => {
    self.viewport.transformLayersBy(ev.delta)
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
    self.viewport.plane = self.initialPlane
    self.initialPlane = null
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
  // tapspace.interaction.PinchLayers:getFreedom()
  //
  // Return
  //   object, the freedom object
  //
  return this.options.freedom
}

proto.unbind = function () {
  // tapspace.interaction.PinchLayers:unbind()
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
