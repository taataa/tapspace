// Transform capturing
//
// Notes:
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
//
//
const emitter = require('component-emitter')
const nudged = require('nudged')
const I = nudged.transform.IDENTITY
const Transform = require('../../../../geometry/Transform')
const Sensor = require('./Sensor')
const transitFreedom = require('./transitFreedom')
const transitPointers = require('./transitPointers')

const GestureCapturer = function (component, options) {
  // Begin to capture and recognize pointer gestures
  // on the given affine element and emit them as gesture events.
  //
  // Parameters
  //   component
  //     a Component or an affine HTMLElement.
  //   options
  //     an optional object with props:
  //       freedom
  //         optional object with props
  //           type
  //             optional string, default 'TSR'. The movement type.
  //           center
  //             optional point2 on the view or Point.
  //             The center point for types 'S', 'R', and 'SR'.
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
  //   gesturestart with transform-gesture object
  //   gesturemove with transform-gesture object
  //   gestureend with transform-gesture object
  //   gesturecancel with transform-gesture object
  //
  // Transform-gesture object has following properties:
  //   travel
  //     a number, total travel in viewport pixels. Manhattan distance.
  //   duration
  //     a number, duration of the gesture in milliseconds
  //   component
  //     a Component, the source for the input events
  //   transform
  //     a tran2, the total transformation on the viewport
  //   delta
  //     a tran2, difference to the previous gesture event (on the viewport)
  //

  // Normalise component
  if (component.affine) {
    this.component = component.affine
  } else {
    if (!component.plane) {
      // Only affine elements can be used for capturing
      // because the pointer coordinates are on page
      // and an affine root is needed to transit
      // the coordinates onto the element.
      throw new Error('Transform gestures cannot be captured ' +
      'from non-affine elements.')
    }
    this.component = component
  }

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

  // Set emitter
  emitter(this)
  const self = this

  // Track the duration of the gesture.
  let startTime = null
  // Track the travelling distance of the pointers.
  let totalTravel = null
  // Track total transformation.
  let totalTransform = null
  // Track which pointers are active and where they are on the root [2][3].
  let pointersOnRoot = {}
  // TODO Track where pointers first appeared on the element.
  // TODO let entryPoints = {}

  // The root is either a Space or Viewport.
  // The browser event coordinates (pageX, pageY) are assumed to have
  // the same resolution and orientation as the root.
  const root = this.component.getRoot()

  const onStart = (firstPointers) => {
    startTime = Date.now()
    totalTravel = 0
    totalTransform = I

    // Convert page coords to root (=viewport) coords. See [3].
    pointersOnRoot = transitPointers(firstPointers, root)

    // TODO Track where pointers appear
    // TODO entryPoints = transitPointers(firstPointers, root, component)

    self.emit('gesturestart', {
      travel: 0,
      duration: 0, // ms
      component: self.component, // TODO or target
      transform: new Transform(root, I),
      delta: new Transform(root, I)
    })
  }

  const onMove = (prevPointers, nextPointers) => {
    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onMove call')
    }

    // Convert page coords onto root. See [3].
    const nextPointersOnRoot = transitPointers(nextPointers, root)

    // Find domain and range points for the transformation estimation.
    // Apply set intersection. Do not use removed or appeared pointers
    // in the estimation because they do not have counterpart.
    const domain = []
    const range = []
    Object.keys(pointersOnRoot).forEach(k => {
      if (nextPointersOnRoot[k]) {
        // Pointer exists on both
        domain.push(pointersOnRoot[k])
        range.push(nextPointersOnRoot[k])
      }
    })

    // Normalise freedom arguments onto the root.
    // We must do this every move because the gesture might eventually
    // move the viewport.
    const freedomOnRoot = transitFreedom(this.freedom, root)

    // Estimate optimal transformation.
    // This is a microtransformation, meaning that
    // likely only few of the pointers moved.
    const tr = nudged.estimate({
      estimator: freedomOnRoot.type,
      domain: domain,
      range: range,
      center: freedomOnRoot.center,
      angle: freedomOnRoot.angle
    })

    // TODO record locations of new pointers to
    // provide them in the tap event.

    // Accumulate to travelled distance. See [1]
    // Use Manhattan distance for simpler computation. IS REALLY?
    // Goal is to form a threshold to filter out small
    // involuntary movement of the fingers or arm.
    //
    // N: Divide distance by number of fingers. This way
    // an involuntary arm movement has same threshold regardless of
    // the number of touching fingers.
    //
    // Note that we compute travel on view instead of travel on
    // the plane. This way travel does not depend on transformations
    // of the space, but only the screen pixels.
    const prevKeys = Object.keys(prevPointers)
    const prevNumPointers = prevKeys.length
    prevKeys.forEach(k => {
      if (nextPointers[k]) {
        // Pointer exists on both
        const dx = prevPointers[k].x - nextPointers[k].x
        const dy = prevPointers[k].y - nextPointers[k].y
        totalTravel += (Math.abs(dx) + Math.abs(dy)) / prevNumPointers
      }
    })

    // Accumulate transform
    totalTransform = nudged.transform.compose(tr, totalTransform)

    // Delta computed. Remember the new pointer locations for the next.
    pointersOnRoot = nextPointersOnRoot

    self.emit('gesturemove', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: self.component,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, tr)
    })
  }

  const onEnd = (lastPointers) => {
    // Handle the last pointer(s) of the gesture.
    //

    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onEnd call')
    }

    self.emit('gestureend', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: self.component,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, I)
    })
    // TODO emit tap? or do it outside based on gesture events?
    // TODO set up gesture classes outside transform capturer

    // Clean up
    startTime = null
    totalTravel = null
    totalTransform = null
    pointersOnRoot = {}
  }

  const onCancel = (lastPointers) => {
    // Handle the cancelling of the gesture.
    //

    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onCancel call')
    }

    self.emit('gesturecancel', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: self.component,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, I)
    })

    // Clean up
    startTime = null
    totalTravel = null
    totalTransform = null
    pointersOnRoot = {}
  }

  this.sensor = new Sensor(this.component.element, {
    onstart: onStart,
    onmove: onMove,
    onend: onEnd,
    oncancel: onCancel,
    preventDefault: this.preventDefault,
    stopPropagation: this.stopPropagation
  })
}

GestureCapturer.prototype.update = function (options) {
  // Update options.
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

  // Delegate updates to sensor
  this.sensor.update({
    preventDefault: this.preventDefault,
    stopPropagation: this.stopPropagation
  })
}

GestureCapturer.prototype.unbind = function () {
  // Unbind the DOM element listeners of the sensor.
  // Unbind own listeners, if any.
  //
  this.sensor.unbind()
  this.sensor = null
  // The clients of the capturer could have registered
  // listeners. We close them because the capturer is destroyed.
  this.off()
}

module.exports = GestureCapturer
