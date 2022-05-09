// Transform capturing
//
// Notes:
//   [1] For press event detection, we can place a threshold how far
//       we allow fingers to move to still classify it as a press.
//
const emitter = require('component-emitter')
const Sensor = require('./Sensor')
const projectPointers = require('./projectPointers')
const nudged = require('nudged')
const I = nudged.transform.IDENTITY

const TransformCapturer = function (element, mode) {
  // Begin to capture and recognize pointer gestures
  // on the given element and emit them as gesture events.
  //
  // Parameters
  //   element
  //     AffineElement or HTMLElement to listen.
  //
  // Emits
  //   gesturestart
  //   gesturemove
  //   gestureend
  //

  // Allow AffineElement
  if (element.proj) {
    element = element.el
  }
  // Only affine elements can be used for capturing
  // because the pointer coordinates are on page
  // and an affine root is needed to project
  // the coordinates onto the element.
  if (!element.affine) {
    throw new Error('Transform gestures cannot be captured ' +
      'from non-affine elements.')
  }

  emitter(this)
  const self = this

  // Track the duration of the gesture.
  let startTime = null
  // Track the travelling distance of the pointers.
  let totalTravel = null
  // Track total transformation.
  let totalTransform = null
  // Track which pointers are active and where they are on the element.
  // Note these are pageX, pageY coords thus the translation is off.
  let pointersOnElem = {}
  // TODO Track where pointers first appeared on the element.
  // Note these are pageX, pageY coords thus the translation is off.
  // TODO let entryPoints = {}

  // The root is either a Space or Viewport.
  // The root is used to project coordinates to the element.
  const root = element.affine.getAffineRoot()

  const onStart = (firstPointers) => {
    startTime = Date.now()
    totalTravel = 0
    totalTransform = I

    pointersOnElem = projectPointers(firstPointers, root, element)
    // TODO entryPoints = Object.assign({}, pointersOnElem) // copy

    self.emit('gesturestart', {
      travel: 0,
      duration: 0, // ms
      element: element,
      transform: I,
      delta: I
    })
  }

  const onMove = (prevPointers, nextPointers) => {
    // DEBUG assert that always started
    if (startTime === null) {
      throw new Error('Unexpected onMove call')
    }

    const nextPointersOnElem = projectPointers(nextPointers, root, element)

    // Find domain and range points for the transformation estimation.
    // Appy set intersection. Do not use removed or appeared pointers
    // in the estimation.
    const domain = []
    const range = []
    Object.keys(pointersOnElem).forEach(k => {
      if (nextPointersOnElem[k]) {
        // Pointer exists on both
        domain.push(pointersOnElem[k])
        range.push(nextPointersOnElem[k])
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
    // Use Manhattan distance for simpler computation.
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

    self.emit('gesturemove', {
      travel: totalTravel,
      duration: Date.now() - startTime,
      element: element,
      transform: totalTransform,
      delta: tr
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
      element: element,
      transform: totalTransform,
      delta: I
    })
    // TODO emit tap? or do it outside based on gesture events?
    // TODO set up gesture classes outside transform capturer

    // Clean up
    startTime = null
    totalTravel = null
    totalTransform = null
    pointersOnElem = {}
  }

  this.sensor = new Sensor(element, {
    onstart: onStart,
    onmove: onMove,
    onend: onEnd
  })
}

// TODO TransformCapturer.prototype.update ?

TransformCapturer.prototype.destroy = function () {
  this.sensor.destroy()
}

module.exports = TransformCapturer