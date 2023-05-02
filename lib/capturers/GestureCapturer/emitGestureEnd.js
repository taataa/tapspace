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

  // Find the viewport. See [5] at index.
  const root = capturer.component.getViewport()
  if (!root) {
    throw new Error('Cannot capture gesture without a viewport.')
  }

  // Convert freedom and pointer page coords onto root
  // to get proper delta center for end event.
  const freedomOnRoot = transitFreedom(capturer.freedom, root)
  const lastPointersOnRoot = transitPointers(lastPointers, root)
  const meanOnRoot = getPointersAverage(lastPointersOnRoot)
  const deltaOriginOnRoot = getDeltaOrigin(freedomOnRoot, meanOnRoot)

  capturer.emit('gestureend', {
    travel: gestureState.totalTravel,
    duration: Date.now() - gestureState.startTime,
    component: capturer.component,
    target: gestureState.target,
    mean: new Point(root, meanOnRoot),
    transform: new Transform(root, gestureState.totalTransform),
    transformOrigin: new Point(root, { x: 0, y: 0 }),
    delta: new Transform(root, I),
    deltaOrigin: new Point(root, deltaOriginOnRoot)
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
