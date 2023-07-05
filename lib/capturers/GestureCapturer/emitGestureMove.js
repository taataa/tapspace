const transitPointers = require('./transitPointers')
const transitFreedom = require('./transitFreedom')
const convertToActive = require('./convertToActive')
const getPointersAverage = require('./getPointersAverage')
const getDeltaOrigin = require('./getDeltaOrigin')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const nudged = require('nudged')
const composeTransform = nudged.transform.compose

module.exports = (capturer, gestureState, prevPointers, nextPointers) => {
  // DEBUG assert that always started
  if (gestureState.startTime === null) {
    throw new Error('Unexpected onMove call')
  }

  // Find the viewport. See [5] at index.
  const root = capturer.component.getViewport()
  if (!root) {
    throw new Error('Cannot capture gesture without a viewport.')
  }

  // OPTIMIZATION: use prevPointersOnRoot to skip the same
  // transition computation. TODO Brings complexity or robustness?
  const prevPointersOnRoot = gestureState.pointersOnRoot

  // Convert page coords onto root. See [3] at index.
  const nextPointersOnRoot = transitPointers(nextPointers, root)

  // Find domain and range points for the transformation estimation.
  // Apply set intersection. Do not use removed or appeared pointers
  // in the estimation because they do not have counterpart.
  const domain = []
  const range = []
  Object.keys(prevPointersOnRoot).forEach(k => {
    if (nextPointersOnRoot[k]) {
      // Pointer exists on both
      domain.push(prevPointersOnRoot[k])
      range.push(nextPointersOnRoot[k])
    }
  })

  // Normalise freedom arguments onto the root.
  // We must do this every move because the gesture might eventually
  // move the viewport.
  const freedomOnRoot = transitFreedom(capturer.freedom, root)
  // Gesture mean
  const meanOnRoot = getPointersAverage(nextPointersOnRoot)
  // Compute origin point. The transformation happens at/around this point.
  const deltaOriginOnRoot = getDeltaOrigin(freedomOnRoot, meanOnRoot)
  // TODO separate; unhack

  // Compute ev.delta
  // Estimate optimal transformation.
  // This is a microtransformation, meaning that
  // likely only few of the pointers moved.
  const tr = nudged.estimate({
    estimator: freedomOnRoot.type,
    domain,
    range,
    center: freedomOnRoot.pivot, // use null freedom.pivot for nudged api
    angle: freedomOnRoot.angle
  })
  // Nudged works with helm2 objects. Convert to helm2z.
  tr.z = 0

  // Convert nudged's plane transition to an affine transformation.
  // Removes the location of the transformation i.e.
  // converts from a passive transformation to an active one.
  const trActive = convertToActive(tr, deltaOriginOnRoot)

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
  let travelDelta = 0
  prevKeys.forEach(k => {
    if (nextPointers[k]) {
      // Pointer exists on both
      const dx = prevPointers[k].x - nextPointers[k].x
      const dy = prevPointers[k].y - nextPointers[k].y
      travelDelta += (Math.abs(dx) + Math.abs(dy)) / prevNumPointers
    }
  })

  // Accumulate total travel
  gestureState.totalTravel += travelDelta

  // Accumulate total transform.
  // Delta origin is not constant. We need a stable origin for the total.
  // Therefore we use viewport (0,0) as the origin for the total transform.
  // Furthermore we can and must use original passive nudged tr.
  const nextTotal = composeTransform(tr, gestureState.totalTransform)
  gestureState.totalTransform = nextTotal

  // Delta computed.
  // OPTIMIZATION Remember the new pointer locations for the next.
  gestureState.pointersOnRoot = nextPointersOnRoot

  capturer.emit('gesturemove', {
    travel: gestureState.totalTravel,
    duration: Date.now() - gestureState.startTime,
    component: capturer.component,
    target: gestureState.target,
    mean: new Point(root, meanOnRoot),
    transform: new Transform(root, gestureState.totalTransform),
    transformOrigin: new Point(root, { x: 0, y: 0 }),
    delta: new Transform(root, trActive),
    deltaOrigin: new Point(root, deltaOriginOnRoot)
  })
}
