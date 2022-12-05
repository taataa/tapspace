const transitPointers = require('./transitPointers')
const transitFreedom = require('./transitFreedom')
const getPointersAverage = require('./getPointersAverage')
const getDeltaOrigin = require('./getDeltaOrigin')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const I = require('nudged').transform.IDENTITY

module.exports = (capturer, gestureState, lastPointers) => {
  // Handle the cancelling of the gesture.
  //

  // DEBUG assert that always started
  if (gestureState.startTime === null) {
    throw new Error('Unexpected onCancel call')
  }

  // DEBUG assert non-empty lastPointers
  if (Object.keys(lastPointers).length < 1) {
    throw new Error('Unexpected empty lastPointers')
  }

  // Convert freedom and pointer page coords onto root
  // to get proper delta center for cancel event.
  // Note this is somewhat rare case that any data about
  // the center is needed in cancel. Let still be consistent
  // with the onEnd behavior here at onCancel.
  const freedomOnRoot = transitFreedom(capturer.freedom, capturer.root)
  const lastPointersOnRoot = transitPointers(lastPointers, capturer.root)
  const meanOnRoot = getPointersAverage(lastPointersOnRoot)
  const deltaOriginOnRoot = getDeltaOrigin(freedomOnRoot, meanOnRoot)

  capturer.emit('gesturecancel', {
    travel: gestureState.totalTravel,
    duration: Date.now() - gestureState.startTime,
    component: capturer.component,
    target: gestureState.target,
    mean: new Point(capturer.root, meanOnRoot),
    transform: new Transform(capturer.root, gestureState.totalTransform),
    transformOrigin: new Point(capturer.root, { x: 0, y: 0 }),
    delta: new Transform(capturer.root, I),
    deltaOrigin: new Point(capturer.root, deltaOriginOnRoot)
  })

  // Clean up
  gestureState.startTime = null
  gestureState.totalTravel = null
  gestureState.totalTransform = null
  gestureState.pointersOnRoot = {}
  gestureState.target = null
}
