const applicators = require('./applicators')

const PinchGesture = function (source, target, options) {
  // tapspace.interaction.Pinch(source, target, options)
  //
  // Pinch transform interaction for items and other interactive planes.
  // Drag, scale, and rotate items by using pointers.
  // During pinch the target has the class `active-pinch`.
  //
  // Parameters:
  //   source
  //     a Plane. Get gesture input from this component.
  //     .. The source begins to emit pinch events.
  //   target
  //     a Plane. Apply gesture effects to this component.
  //   options, object with properties:
  //     freedom
  //       optional object with properties:
  //         type
  //           a string, for example 'TS'
  //         pivot
  //           a Point. The pivot point for the types 'S', 'R', 'SR'.
  //           .. Default is null.
  //         angle
  //           a Direction. The line angle for the freedom type 'L'.
  //           .. Default is null.
  //     applicator
  //       optional string, one of 'item', 'viewport'. Default is 'item'.
  //       .. This selects the applicator function that applies
  //       .. the pinch transformation to the target element.
  //
  // Makes the source emit:
  //   pinchstart
  //     when the first pointer enters
  //   pinchmove
  //     when the pointers move
  //   pinchend
  //     when the last pointer leaves
  //   pinchcancel
  //     when the last pointer cancels
  //   pinch
  //     alias for pinchmove
  //

  // Validate source
  if (source.transformBy) {
    this.source = source
  } else {
    throw new Error('You cannot read pinch input from a non-affine element.')
  }
  // Validate target
  if (target.transformBy) {
    this.target = target
  } else {
    throw new Error('You cannot apply pinch to a non-affine element.')
  }

  // Normalize options
  if (!options) {
    options = {}
  }
  this.options = {}
  if (!options.freedom) {
    this.options.freedom = {
      type: 'I',
      pivot: null,
      angle: null
    }
  } else {
    this.options.freedom = options.freedom
  }
  // Normalize applicator
  this.applicator = applicators.item
  if (typeof options.applicator === 'string') {
    // Ensure availability
    if (applicators[options.applicator]) {
      this.applicator = applicators[options.applicator]
    } else {
      throw new Error('Unknown pinch applicator: ' + options.applicator)
    }
  }

  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
  this.capturer = null
}

module.exports = PinchGesture
const proto = PinchGesture.prototype

proto.bind = function () {
  // tapspace.interaction.Pinch:bind()
  //
  // Bind gesture event listeners.
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  // Pass 'this' for handlers.
  const self = this

  this.ongesturestart = (ev) => {
    // Mark as active. TODO allow custom class name
    self.target.element.classList.add('active-pinch')
    self.source.emit('pinchstart', ev)
  }
  this.ongesturemove = (ev) => {
    // DEBUG
    // console.log('pivot', ev.center.point)
    // console.log('freedom', self.capturer.getFreedom())
    // console.log('ev.delta', ev.delta.helm)
    self.applicator(self.source, self.target, ev)
    self.source.emit('pinchmove', ev)
    self.source.emit('pinch', ev)
  }
  this.ongestureend = (ev) => {
    // Deactivate styling, for example grabbing cursor
    self.target.element.classList.remove('active-pinch')
    self.source.emit('pinchend', ev)
  }
  this.ongesturecancel = (ev) => {
    // TODO Return the target to the original position
    // TODO by using the total transform.
    self.target.element.classList.remove('active-pinch')
    self.source.emit('pinchcancel', ev)
  }

  // Capturer options determine the gesture freedom.
  const capturerOptions = {}
  if (this.options.freedom) {
    capturerOptions.freedom = this.options.freedom
  }
  // Bind listeners to the component capturer.
  this.capturer = this.source.capturer('gesture', capturerOptions)
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gesturemove', this.ongesturemove)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}

proto.disableDilation = require('./disableDilation')
proto.disableRotation = require('./disableRotation')
proto.disableTranslation = require('./disableTranslation')
proto.enableDilation = require('./enableDilation')
proto.enableRotation = require('./enableRotation')
proto.enableTranslation = require('./enableTranslation')
proto.getFreedom = require('./getFreedom')
proto.hasAnyFreedom = require('./hasAnyFreedom')
proto.unbind = require('./unbind')
