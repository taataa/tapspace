const transitPointers = require('./transitPointers')
const transitFreedom = require('./transitFreedom')
const convertToActive = require('./convertToActive')
const getCenter = require('./getCenter')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const nudged = require('nudged')
const composeTransform = nudged.transform.compose

module.exports = (capturer, gestureState, prevPointers, nextPointers) => {
  // DEBUG assert that always started
  if (gestureState.startTime === null) {
    throw new Error('Unexpected onMove call')
  }

  // OPTIMIZATION: use prevPointersOnRoot to skip the same
  // transition computation. TODO Brings complexity or robustness?
  const prevPointersOnRoot = gestureState.pointersOnRoot

  // Convert page coords onto root. See [3].
  const nextPointersOnRoot = transitPointers(nextPointers, capturer.root)

  // Find domain and range points for the transformation estimation.
  // Apply set intersection. Do not use removed or appeared pointers
  // in the estimation because they do not have counterpart.
  const domain = []
  const range = []
  Object.keys(prevPointersOnRoot).forEach(k => {
    if (nextPointersOnRoot[k]) {
      /// Pointer exists on both
      domain.push(prevPointersOnRoot[k])
      range.push(nextPointersOnRoot[k])
    }
  })

  // Normalise freedom arguments onto the root.
  // We must do this every move because the gesture might eventually
  // move the viewport.
  const freedomOnRoot = transitFreedom(capturer.freedom, capturer.root)

  // Compute mean point. The transformation happens at/around this point.
  // TODO Compute from the new set of pointers.
  const center = getCenter(freedomOnRoot, prevPointersOnRoot)
  // TODO separate; unhack

  // Compute ev.delta
  // Estimate optimal transformation.
  // This is a microtransformation, meaning that
  // likely only few of the pointers moved.
  const tr = nudged.estimate({
    estimator: freedomOnRoot.type,
    domain: domain,
    range: range,
    center: freedomOnRoot.pivot, // use null freedom.pivot for nudged api
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
  let travelDelta = 0
  prevKeys.forEach(k => {
    if (nextPointers[k]) {
      /// Pointer exists on both
      const dx = prevPointers[k].x - nextPointers[k].x
      const dy = prevPointers[k].y - nextPointers[k].y
      travelDelta += (Math.abs(dx) + Math.abs(dy)) / prevNumPointers
    }
  })

  // Accumulate total travel
  gestureState.totalTravel += travelDelta

  // Accumulate total transform
  gestureState.totalTransform = composeTransform(
    trActive,
    gestureState.totalTransform
  )

  // Delta computed. Remember the new pointer locations for the next.
  gestureState.pointersOnRoot = nextPointersOnRoot

  capturer.emit('gesturemove', {
    travel: gestureState.totalTravel,
    duration: Date.now() - gestureState.startTime,
    component: capturer.component,
    target: gestureState.target,
    transform: new Transform(capturer.root, gestureState.totalTransform),
    delta: new Transform(capturer.root, trActive),
    center: new Point(capturer.root, center)
  })
}
