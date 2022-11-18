const plane3 = require('affineplane').plane3
const projectForTarget = require('./projectForTarget')

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

  // Normalize options
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
  this.capturer = null
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

  // Pass 'this' for handlers.
  const self = this

  this.ongesturestart = (ev) => {
    // Remember initial position for pan cancellation.
    self.initialTran = plane3.copy(self.viewport.tran)
    // Mark as active. TODO allow custom class name
    self.viewport.element.classList.add('active-pinch')
    self.viewport.emit('pinchstart', ev)
    // DEBUG
    // console.log('ongesturestart', ev)
  }

  this.ongesturemove = (ev) => {
    if (self.viewport.isPerspective()) {
      let target = ev.target
      if (target === self.viewport.getSpace()) {
        // Gesture targets the space background. Find near items.
        // const possibleTarget = viewport.findNearestMass()
        // OPTIMIZE do not run at every event
        target = self.viewport.findMostDistant()
      }

      // Check if space was empty.
      if (target) {
        const deltaHat = projectForTarget(ev.delta.helm, self.viewport, target)
        self.viewport.space.transformBy(deltaHat)
      } // else the space is empty, the target is null. Do not move.
    } else {
      // Orthogonal viewport projection = target at the viewport depth.
      self.viewport.space.transformBy(ev.delta)
    }
    // TODO limit travel
    self.viewport.emit('pinchmove', ev)
    self.viewport.emit('pinch', ev)
    // DEBUG
    // console.log('ongesturemove', ev)
  }

  this.ongestureend = (ev) => {
    // Deactivate grabbing cursor
    self.viewport.element.classList.remove('active-pinch')
    // Snap to pixel grid for pixel-perfect gesture.
    // In perspective mode, the snapping is a lost cause, because
    // almost nothing is exact.
    if (!self.viewport.isPerspective()) {
      self.viewport.snapPixels({
        anchor: self.viewport.atMid()
      })
    }
    // Emit
    self.viewport.emit('pinchend', ev)
    // DEBUG
    // console.log('ongestureend', ev)
  }

  this.ongesturecancel = (ev) => {
    // Return the viewport to the original position
    self.viewport.tran = self.initialTran
    self.initialTran = null
    self.viewport.element.classList.remove('active-pinch')
    self.viewport.renderTransform()
    self.viewport.emit('pinchcancel', ev)
    // DEBUG
    // console.log('ongesturecancel', ev)
  }

  const capturerOptions = {}
  if (this.options.freedom) {
    capturerOptions.freedom = this.options.freedom
  } // TODO make updateable
  this.capturer = this.viewport.capturer('gesture', capturerOptions)
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gesturemove', this.ongesturemove)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}

proto.getFreedom = require('./getFreedom')
proto.hasAnyFreedom = require('./hasAnyFreedom')
proto.unbind = require('./unbind')
