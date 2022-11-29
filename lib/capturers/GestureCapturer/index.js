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
//   [4] We want to know the depth of the touched items so that panning
//       and zooming can be performed in a natural, relative way.
//       Therefore we try to remember the first target elem of the gesture.
//
//
const emitter = require('component-emitter')
const nudged = require('nudged')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const Sensor = require('./Sensor')
const transitFreedom = require('./transitFreedom')
const transitPointers = require('./transitPointers')
const findAffineTarget = require('./findAffineTarget')
const getCenter = require('./getCenter')
const convertToActive = require('./convertToActive')

const I = nudged.transform.IDENTITY

const GestureCapturer = function (component, options) {
  // tapspace.capturers.GestureCapturer(component, options)
  //
  // Begin to capture and recognize pointer gestures
  // on the given affine element and emit them as gesture events.
  //
  // Parameters
  //   component
  //     a Plane or an affine HTMLElement.
  //     The input events will be listened for and captured here.
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
  //   gesturestart event with a transform-gesture object
  //   gesturemove event with a transform-gesture object
  //   gestureend event with a transform-gesture object
  //   gesturecancel event with a transform-gesture object
  //
  // Transform-gesture objects have following properties:
  //   travel
  //     a number, total travel in viewport pixels. Manhattan distance.
  //   duration
  //     a number, duration of the gesture in milliseconds
  //   component
  //     a Component where the input events were listened and captured.
  //   target
  //     a Component where the input landed. Helps e.g. in determining depth.
  //   transform
  //     a Transform, the total transformation on the viewport
  //   delta
  //     a Transform, difference to the previous gesture event (on the viewport)
  //   center
  //     a Point, the middle point of the gesture. With multipointer gestures
  //     .. this is the mean of the active pointers.
  //

  // Normalise component
  if (component.affine) {
    this.component = component.affine
  } else {
    if (!component.tran) {
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
  // Track total transformation. A helm2.
  let totalTransform = null
  // Track which pointers are active and where they are on the root [2][3].
  // Is an object: id -> {x, y}
  let pointersOnRoot = {}
  // TODO Track where pointers first appeared on the element.
  // TODO let entryPoints = {}
  // Track which element was first touched. [4]
  let target = null

  // The root is either a Space or Viewport.
  // The browser event coordinates (pageX, pageY) are assumed to have
  // the same resolution and orientation as the root.
  const root = this.component.getRoot()

  const onStart = (firstPointers) => {
    startTime = Date.now()
    totalTravel = 0
    totalTransform = I
    target = findAffineTarget(firstPointers)

    // Convert page coords to root (=viewport) coords. See [3].
    pointersOnRoot = transitPointers(firstPointers, root)

    // TODO Track where pointers appear
    // TODO entryPoints = transitPointers(firstPointers, root, component)

    // Normalise freedom arguments onto the root.
    // We must do this every move because the gesture might eventually
    // move the viewport.
    const freedomOnRoot = transitFreedom(this.freedom, root)

    // Compute mean point. The transformation happens at/around this point.
    const center = getCenter(freedomOnRoot, pointersOnRoot)

    self.emit('gesturestart', {
      travel: 0,
      duration: 0, // ms
      component: self.component,
      target: target,
      transform: new Transform(root, I),
      delta: new Transform(root, I),
      center: new Point(root, center)
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

    // Compute mean point. The transformation happens at/around this point.
    const center = getCenter(freedomOnRoot, pointersOnRoot)

    // Estimate optimal transformation.
    // This is a microtransformation, meaning that
    // likely only few of the pointers moved.
    const tr = nudged.estimate({
      estimator: freedomOnRoot.type,
      domain: domain,
      range: range,
      center: freedomOnRoot.center, // use null freedom.center for nudged api
      angle: freedomOnRoot.angle
    })
    // Nudged works with helm2 objects. Convert to helm2z.
    tr.z = 0

    // Convert nudged's plane transition to an affine transformation.
    // Removes the location of the transformation i.e.
    // converts from a passive transformation to an active one.
    const trActive = convertToActive(tr, center)

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
    totalTransform = nudged.transform.compose(trActive, totalTransform)

    // Delta computed. Remember the new pointer locations for the next.
    pointersOnRoot = nextPointersOnRoot

    self.emit('gesturemove', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: self.component,
      target: target,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, trActive),
      center: new Point(root, center)
    })
  }

  const onEnd = (lastPointers) => {
    // Handle the last pointer(s) of the gesture.
    //

    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onEnd call')
    }

    // Convert freedom and pointer page coords onto root
    // to get proper delta center for end event.
    const freedomOnRoot = transitFreedom(this.freedom, root)
    const lastPointersOnRoot = transitPointers(lastPointers, root)
    const center = getCenter(freedomOnRoot, lastPointersOnRoot)

    self.emit('gestureend', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: self.component,
      target: target,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, I),
      center: new Point(root, center)
    })
    // TODO emit tap? or do it outside based on gesture events?
    // TODO set up gesture classes outside transform capturer

    // Clean up
    startTime = null
    totalTravel = null
    totalTransform = null
    pointersOnRoot = {}
    target = null
  }

  const onCancel = (lastPointers) => {
    // Handle the cancelling of the gesture.
    //

    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onCancel call')
    }

    // Convert freedom and pointer page coords onto root
    // to get proper delta center for cancel event.
    // Note this is somewhat rare case that any data about
    // the center is needed in cancel. Let still be consistent
    // with the onEnd behavior here at onCancel.
    const freedomOnRoot = transitFreedom(this.freedom, root)
    const lastPointersOnRoot = transitPointers(lastPointers, root)
    const center = getCenter(freedomOnRoot, lastPointersOnRoot)

    self.emit('gesturecancel', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: self.component,
      target: target,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, I),
      center: new Point(root, center)
    })

    // Clean up
    startTime = null
    totalTravel = null
    totalTransform = null
    pointersOnRoot = {}
    target = null
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

GestureCapturer.prototype.getFreedom = function () {
  // tapspace.capturers.GestureCapturer:getFreedom()
  //
  // Get freedom object for example for debugging.
  //
  return this.freedom
}

GestureCapturer.prototype.update = function (options) {
  // tapspace.capturers.GestureCapturer:update(options)
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

  // Delegate updates to sensor
  this.sensor.update({
    preventDefault: this.preventDefault,
    stopPropagation: this.stopPropagation
  })
}

GestureCapturer.prototype.unbind = function () {
  // tapspace.capturers.GestureCapturer:unbind()
  //
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
