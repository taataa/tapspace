// Transform capturing
//
// Notes:
//   [1] Useful for hold event detection. We can place a threshold how far
//       we allow fingers to move to still classify it as a press.
//   [2] The movement must be measured in the viewport. The viewport is
//       assumed to stay still during the gesture unlike the component
//       itself. We cannot measure on the parent because the parent may
//       be a target for the gesture effect and move.
//
const emitter = require('component-emitter')
const Sensor = require('./Sensor')
// TODO needed? const projectPointers = require('./projectPointers')
const nudged = require('nudged')
const I = nudged.transform.IDENTITY
const Transform = require('../../../../geometry/Transform')

const GestureCapturer = function (component, opts) {
  // Begin to capture and recognize pointer gestures
  // on the given affine element and emit them as gesture events.
  //
  // Parameters
  //   component
  //     a Component or an affine HTMLElement.
  //   opts
  //     an optional object with props:
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

  // Normalise to component
  if (component.affine) {
    component = component.affine
  } else if (!component.proj) {
    // Only affine elements can be used for capturing
    // because the pointer coordinates are on page
    // and an affine root is needed to project
    // the coordinates onto the element.
    throw new Error('Transform gestures cannot be captured ' +
    'from non-affine elements.')
  }

  // Default options
  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    preventDefault: true,
    stopPropagation: false
  }, opts)

  // Set emitter
  emitter(this)
  const self = this

  // Track the duration of the gesture.
  let startTime = null
  // Track the travelling distance of the pointers.
  let totalTravel = null
  // Track total transformation.
  let totalTransform = null
  // Track which pointers are active and where they are on the root [2].
  // Note these are pageX, pageY coords thus the translation does not
  // match the viewport origin.
  let pointersOnRoot = {}
  // TODO Track where pointers first appeared on the element.
  // Note these are pageX, pageY coords thus the translation does not
  // match the viewport origin.
  // TODO let entryPoints = {}

  // The root is either a Space or Viewport.
  // The browser event coordinates are assumed to have same resolution
  // and orientation as the root, but the page origin is arbitrary.
  // TODO either build a way to get viewport coordinate on page
  // OR TODO publish only relative data (= origin agnostic)
  const root = component.getRoot()

  const onStart = (firstPointers) => {
    startTime = Date.now()
    totalTravel = 0
    totalTransform = I

    pointersOnRoot = firstPointers
    // TODO Track where pointers appear
    // entryPoints = projectPointers(firstPointers, root, component)

    self.emit('gesturestart', {
      travel: 0,
      duration: 0, // ms
      component: component, // TODO or target
      transform: new Transform(root, I),
      delta: new Transform(root, I)
    })
  }

  const onMove = (prevPointers, nextPointers) => {
    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onMove call')
    }

    const nextPointersOnRoot = nextPointers
    // TODO needed? projectPointers(nextPointers, root, component)

    // Find domain and range points for the transformation estimation.
    // Appy set intersection. Do not use removed or appeared pointers
    // in the estimation.
    const domain = []
    const range = []
    Object.keys(pointersOnRoot).forEach(k => {
      if (nextPointersOnRoot[k]) {
        // Pointer exists on both
        domain.push(pointersOnRoot[k])
        range.push(nextPointersOnRoot[k])
      }
    })

    // TODO handle pivot and different transformations
    // Estimate optimal transformation.
    // This is a microtransformation, meaning that
    // likely only few of the pointers moved.
    const tr = nudged.estimate({
      estimator: 'TSR',
      domain: domain,
      range: range
    })

    // TODO record locations of new pointers to
    // provide them in the tap event.

    // Accumulate to travelled distance. See [1]
    // Use Manhattan distance for simpler computation. IS REALLY?
    // Goal is to form a threshold to filter out small
    // involuntary movement of the fingers or arm.
    //
    // N. Divide distance by number of fingers. This way
    // an involuntary arm movement has same threshold regardless of
    // the number of touching fingers.
    //
    // Note that we compute travel on view instead of travel on
    // the plane. This way travel does not depend on transformations
    // of the space, but only the screen pixels.
    Object.keys(prevPointers).forEach(k => {
      if (nextPointers[k]) {
        // Pointer exists on both
        const dx = prevPointers[k].x - nextPointers[k].x
        const dy = prevPointers[k].y - nextPointers[k].y
        totalTravel += Math.abs(dx) + Math.abs(dy)
      }
    })

    // Accumulate transform
    totalTransform = nudged.transform.compose(tr, totalTransform)

    // Delta computed. Remember the new pointer locations for the next.
    pointersOnRoot = nextPointersOnRoot

    self.emit('gesturemove', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      component: component,
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
      component: component,
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
      component: component,
      transform: new Transform(root, totalTransform),
      delta: new Transform(root, I)
    })

    // Clean up
    startTime = null
    totalTravel = null
    totalTransform = null
    pointersOnRoot = {}
  }

  this.sensor = new Sensor(component.element, {
    onstart: onStart,
    onmove: onMove,
    onend: onEnd,
    oncancel: onCancel,
    preventDefault: opts.preventDefault,
    stopPropagation: opts.stopPropagation
  })
}

// TODO GestureCapturer.prototype.update ?

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
