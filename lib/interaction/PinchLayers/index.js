const affineplane = require('affineplane')
const proj2 = affineplane.proj2

const PinchLayers = function (viewport, options) {
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
  this.options = Object.assign({
    freedom: {
      type: 'TS',
      center: null,
      angle: null
    }
  }, options)

  // Emit events via viewport
  // TODO see if valid viewport
  this.viewport = viewport

  // Keep track of initial position of the pan so that it can be cancelled.
  this.initialProj = null

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
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.ongesturestart = (ev) => {
    // Remember initial position for pan cancellation.
    self.initialProj = proj2.copy(self.viewport.proj)
    self.viewport.emit('pinchstart', ev)
  }

  this.ongesturemove = (ev) => {
    self.viewport.transformLayersBy(ev.delta)
    // TODO limit travel
    self.viewport.emit('pinchmove', ev)
    self.viewport.emit('pinch', ev) // TODO needed?
  }

  this.ongestureend = (ev) => {
    self.viewport.emit('pinchend', ev)
  }

  this.ongesturecancel = (ev) => {
    // Return the viewport to the original position
    self.viewport.proj = self.initialProj
    self.initialProj = null
    self.viewport.renderCss()
    self.viewport.emit('pinchcancel', ev)
  }

  const capturerOptions = {
    freedom: this.options.freedom
  } // TODO make updateable
  const capturer = this.viewport.capturer('gesture', capturerOptions)
  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gesturemove', this.ongesturemove)
  capturer.on('gestureend', this.ongestureend)
  capturer.on('gesturecancel', this.ongesturecancel)
}

proto.getFreedom = function () {
  // Return
  //   object, the freedom object
  //
  return this.options.freedom
}

proto.unbind = function () {
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
