// Capturing of transform gestures
//
// Design notes:
//   [1] Useful for hold event detection. We can place a threshold how far
//       we allow fingers to move to still classify it as a press.
//   [2] The movement must be measured in the viewport. The viewport is
//       assumed to stay still during the gesture unlike the component
//       itself. We cannot measure on the parent component because the parent
//       may be a target for the gesture effect and also move.
//   [3] The movement cannot be measured on the page, regardless of the view
//       usually has the same orientation and pixel resolution with offset.
//       The offset makes it difficult to deal with fixed pivot points.
//       In 2.0.0-alpha.0 we tried to transit the pivot onto page and do
//       the estimation in page coordinates. However, the resulting
//       transformation was offsetted and would have needed transiting back
//       to our viewport. This felt sketchy and therefore we decided to
//       transit the pointer page coordinates onto the viewport instead.
//   [4] We want to know the depth of the touched items so that panning
//       and zooming can be performed in a natural, relative way.
//       Therefore we try to remember the first target elem of the gesture.
//   [5] The component to capture should not need to be connected to DOM
//       and a viewport at the time of construction. We want this in order
//       to allow the app developer to set component abilities before attaching
//       the component to space. For this reason, we cannot cache the viewport
//       and must find it just-in-time, only when we need it.
//       Finding the viewport is an operation with comp.complexity of O(d)
//       where d is the depth of the affine tree. Therefore the operation is
//       quite fast and can be rerun at every event without much penalty.
//   [6] The browser event coordinates (pageX, pageY) are assumed to have
//       the same resolution and orientation as the viewport.
//
const Capturer = require('../Capturer')
const Sensor = require('./Sensor')
const emitGestureStart = require('./emitGestureStart')
const emitGestureMove = require('./emitGestureMove')
const emitGestureEnd = require('./emitGestureEnd')
const emitGestureCancel = require('./emitGestureCancel')

const GestureCapturer = function (component, options) {
  // @GestureCapturer(component, options)
  //
  // Inherits Capturer
  //
  // Begin to capture and recognize pointer gestures
  // on the given component and emit them as gesture events.
  // The component does not need to be connected to camera at
  // the time of construction, but eventually it needs to be connected
  // in order to capture gestures.
  //
  // Parameters
  //   component
  //     a Component, the source of input events.
  //   options
  //     an optional object with props:
  //       freedom
  //         optional object with props
  //           type
  //             optional string, default 'TSR'. The movement type.
  //           pivot
  //             optional point2 on the view or Point.
  //             The pivot point for types 'S', 'R', and 'SR'.
  //             If a Point, the basis is preserved and followed.
  //           angle
  //             optional number in radians or Direction.
  //             The line angle for type 'L'.
  //             If a Direction, the basis is preserved and followed.
  //       preventDefault
  //         an optional boolean, default true.
  //         ..Set false allow default browser behavior on all handled events.
  //       stopPropagation
  //         an optional boolean, default false.
  //         ..Set true to stop event bubbling on all handled events.
  //
  // Emits
  //   *gesturestart* with a gesture event object
  //   *gesturemove* with a gesture event object
  //   *gestureend* with a gesture event object
  //   *gesturecancel* with a gesture event object
  //
  // Gesture event objects have following properties:
  //   travel
  //     a number, total travel in viewport pixels. Manhattan distance.
  //   duration
  //     a number, duration of the gesture in milliseconds
  //   component
  //     a Component where the input events were listened and captured.
  //   target
  //     a Component where the input landed. Helps e.g. in determining depth.
  //   mean
  //     a Point, the average of the coordinates of active pointers.
  //   transform
  //     a Transform, the total transformation on the viewport,
  //     .. the sum of all movements from the gesture start
  //     .. to this event.
  //   transformOrigin
  //     a Point. The position of the transform on the viewport.
  //   delta
  //     a Transform, difference to the previous gesture event.
  //     .. Measured on the viewport.
  //   deltaOrigin
  //     a Point. The position of the delta transform on the viewport.
  //

  // Inherit
  Capturer.call(this)

  // Validate component
  if (!component || !component.tran) {
    throw new Error('Invalid component')
  }
  this.component = component

  // Default options
  if (!options) {
    options = {}
  }
  this.preventDefault = true
  if (typeof options.preventDefault === 'boolean') {
    this.preventDefault = options.preventDefault
  }
  if (typeof options.stopPropagation === 'boolean') {
    this.stopPropagation = options.stopPropagation
  }

  // Detect freedom that is set but null
  this.freedom = { type: 'TSR' }
  if (options.freedom) {
    this.freedom = options.freedom
  }
  // DEBUG validate freedom
  if (!this.freedom.type) {
    throw new Error('A freedom object must have a freedom type.')
  }

  this.bound = false
  this.sensor = null
}

module.exports = GestureCapturer
const proto = GestureCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

proto.bind = function () {
  // @GestureCapturer:bind()
  //
  // Start event listeners and gesture capturing.
  //

  // Prevent double bind
  if (this.bound) {
    return
  }
  this.bound = true

  const gestureState = {
    // Track the duration of the gesture.
    startTime: null,
    // Track the travelling distance of the pointers.
    totalTravel: null,
    // Track total transformation. A helm2.
    totalTransform: null,
    // Track which pointers are active and where they are on the root [2][3].
    // Is an object: id -> {x, y}
    pointersOnRoot: {},
    // TODO Track where pointers first appeared on the element.
    // TODO let entryPoints = {}
    // Track which element was first touched. [4]
    target: null
  }

  // TODO use factory pattern to avoid
  // double fn call except during construction. TODO
  const self = this
  const onStart = (firstPointers, modifiers) => {
    emitGestureStart(self, gestureState, firstPointers, modifiers)
  }
  const onMove = (prevPointers, nextPointers, modifiers) => {
    emitGestureMove(self, gestureState, prevPointers, nextPointers, modifiers)
  }
  const onEnd = (lastPointers, modifiers) => {
    emitGestureEnd(self, gestureState, lastPointers, modifiers)
  }
  const onCancel = (lastPointers, modifiers) => {
    emitGestureCancel(self, gestureState, lastPointers, modifiers)
  }

  this.sensor = new Sensor(this.component.element, {
    onstart: onStart,
    onmove: onMove,
    onend: onEnd,
    oncancel: onCancel
  }, {
    preventDefault: this.preventDefault,
    stopPropagation: this.stopPropagation
  })
}

proto.getFreedom = function () {
  // @GestureCapturer:getFreedom()
  //
  // Get freedom object for example for debugging.
  //
  return this.freedom
}

proto.update = function (options) {
  // @GestureCapturer:update(options)
  //
  // Update capturer options.
  //
  // Parameters:
  //   options, object with properties:
  //     freedom
  //       optional object
  //     preventDefault
  //       optional boolean
  //     stopPropagation
  //       optional boolean
  //

  if (options.freedom) {
    this.freedom = options.freedom
  }
  if (typeof options.preventDefault === 'boolean') {
    this.preventDefault = options.preventDefault
  }
  if (typeof options.stopPropagation === 'boolean') {
    this.stopPropagation = options.stopPropagation
  }

  if (this.sensor) {
    this.sensor.update({
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation
    })
  }
}

proto.unbind = function () {
  // @GestureCapturer:unbind()
  //
  // Unbind the DOM element listeners of the sensor.
  // Unbind own listeners, if any.
  //
  if (!this.bound) {
    return
  }
  this.bound = false

  this.sensor.unbind()
  this.sensor = null
  // The clients of the capturer could have registered
  // listeners. We close them because the capturer is destroyed.
  this.off()
}
