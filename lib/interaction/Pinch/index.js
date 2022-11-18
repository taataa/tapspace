const PinchGesture = function (source, target, options) {
  // tapspace.interaction.Pinch(source, target, options)
  //
  // Pinch transform interaction for items.
  // Drag, scale, and rotate items by using pointers.
  //
  // Parameters:
  //   source
  //     an Item. Get gesture input from this component.
  //   target
  //     an Item. Apply gesture effects to this component.
  //   options, object with properties:
  //     freedom
  //       optional object with properties:
  //         type
  //           a string, e.g. 'TS'
  //         center
  //           a Point. The center point for the types 'S', 'R', 'SR'.
  //           .. Default is null.
  //         angle
  //           a Direction. The line angle for the freedom type 'L'.
  //           .. Default is null.
  //

  // Validate source
  if (source.tran) {
    this.source = source
  } else {
    throw new Error('You cannot read pinch input from a non-affine element.')
  }
  // Validate target
  if (target.tran) {
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
      type: 'TS',
      center: null,
      angle: null
    }
  } else {
    this.options.freedom = options.freedom
  }

  // Track if interaction bound. Just a safeguard.
  this.bound = false
  this.capturer = null
  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null
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
    self.target.emit('pinchstart', ev)
  }
  this.ongesturemove = (ev) => {
    // DEBUG
    // console.log('center', ev.center.point)
    // console.log('freedom', self.capturer.getFreedom())
    // console.log('ev.delta', ev.delta.helm)

    // ev.delta is a Transform on the viewport.
    // Transforms are locationless. A center point gives it a location.
    // Think that the transform will be applied at a point.
    self.target.transformBy(ev.delta, ev.center)

    // It has a position and thus we cannot treat is as helm3 but plane3.
    // const targetBasis = self.target.getTransitionTo(ev.delta.basis)
    // const deltaOnTarget = plane3.transitTo(ev.delta.helm, targetBasis)
    // self.target.transformBy(ev.delta)
    self.target.emit('pinchmove', ev)
    self.target.emit('pinch', ev)
  }
  this.ongestureend = (ev) => {
    self.target.emit('pinchend', ev)
  }
  this.ongesturecancel = (ev) => {
    self.target.emit('pinchcancel', ev)
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

proto.disableRotation = require('./disableRotation')
proto.enableRotation = require('./enableRotation')

proto.getFreedom = require('./getFreedom')

proto.unbind = function () {
  // tapspace.interaction.Pinch:unbind()
  //
  // Unbind listeners and stop the ongoing gesture if any.
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    this.capturer.off('gesturstart', this.ongesturstart)
    this.capturer.off('gesturemove', this.ongesturemove)
    this.capturer.off('gestureend', this.ongestureend)
    this.capturer.off('gesturecancel', this.ongesturecancel)
    // Help garbage collector
    this.capturer = null
    this.ongesturestart = null
    this.ongesturemove = null
    this.ongestureend = null
    this.ongesturecancel = null
  }
}
