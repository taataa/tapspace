const transitPointers = require('./transitPointers')
const transitFreedom = require('./transitFreedom')
const getPointersAverage = require('./getPointersAverage')
const getDeltaOrigin = require('./getDeltaOrigin')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const I = require('nudged').transform.IDENTITY

module.exports = (capturer, gestureState, lastPointers) => {
  // Handle the last pointer(s) of the gesture.
  //

  // DEBUG assert that always started
  if (gestureState.startTime === null) {
    throw new Error('Unexpected onEnd call')
  }

  // Convert freedom and pointer page coords onto root
  // to get proper delta center for end event.
  const freedomOnRoot = transitFreedom(capturer.freedom, capturer.root)
  const lastPointersOnRoot = transitPointers(lastPointers, capturer.root)
  const meanOnRoot = getPointersAverage(lastPointersOnRoot)
  const deltaOriginOnRoot = getDeltaOrigin(freedomOnRoot, meanOnRoot)

  capturer.emit('gestureend', {
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
  // TODO emit tap? or do it outside based on gesture events?
  // TODO set up gesture classes outside transform capturer

  // Clean up
  gestureState.startTime = null
  gestureState.totalTravel = null
  gestureState.totalTransform = null
  gestureState.pointersOnRoot = {}
  gestureState.target = null
}
