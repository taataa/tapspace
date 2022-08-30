const geom = require('affineplane')

const PanLayers = function (viewport, options) {
  // tapspace.interaction.PanLayers(viewport, options)
  //
  // Pan interaction for viewports. Translate the viewport layers around.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Get input form this component.
  //   options, object with properties:
  //     TODO some limits perhaps
  //

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    // TODO default values
  }, options)

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

module.exports = PanLayers
const proto = PanLayers.prototype

proto.bind = function () {
  // tapspace.interaction.PanLayers:bind()
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.ongesturestart = (ev) => {
    // Remember initial position for pan cancellation.
    self.initialPlane = geom.plane3.copy(self.viewport.plane)
    self.viewport.emit('panstart', ev)
  }

  this.ongesturemove = (ev) => {
    self.viewport.transformLayersBy(ev.delta)
    // TODO limit travel
    self.viewport.emit('panmove', ev)
    self.viewport.emit('pan', ev) // TODO needed?
  }

  this.ongestureend = (ev) => {
    self.viewport.emit('panend', ev)
  }

  this.ongesturecancel = (ev) => {
    // Return the viewport to the original position
    self.viewport.plane = self.initialPlane
    self.initialPlane = null
    self.viewport.renderTransform()
    self.viewport.emit('pancancel', ev)
  }

  const capturer = this.viewport.capturer('gesture')
  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gesturemove', this.ongesturemove)
  capturer.on('gestureend', this.ongestureend)
  capturer.on('gesturecancel', this.ongesturecancel)
}

proto.unbind = function () {
  // tapspace.interaction.PanLayers:unbind()
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
