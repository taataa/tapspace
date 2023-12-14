const findAffineTarget = require('./findAffineTarget')
const transitPointers = require('./transitPointers')
const transitFreedom = require('./transitFreedom')
const getDeltaOrigin = require('./getDeltaOrigin')
const getPointersAverage = require('./getPointersAverage')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const I = require('nudged').transform.IDENTITY

module.exports = (capturer, gestureState, firstPointers, modifiers) => {
  // Make capturer emit a gesture start event.
  //

  // Find the viewport. See [5] at index.
  const root = capturer.component.getViewport()
  if (!root) {
    throw new Error('Cannot capture gesture without a viewport.')
  }

  // Convert page coords to root (=viewport) coords. See [3] and [6] at index.
  const firstPointersOnRoot = transitPointers(firstPointers, root)

  // Init state.
  gestureState.startTime = Date.now()
  gestureState.totalTravel = 0
  gestureState.totalTransform = I
  gestureState.target = findAffineTarget(firstPointers)
  gestureState.pointersOnRoot = firstPointersOnRoot

  // TODO Track where pointers appear
  // TODO entryPoints = transitPointers(firstPointers, root, component)

  // Normalise freedom arguments onto the root.
  // We must do this every move because the gesture might eventually
  // move the viewport.
  const freedomOnRoot = transitFreedom(capturer.freedom, root)
  const meanOnRoot = getPointersAverage(firstPointersOnRoot)
  const deltaOriginOnRoot = getDeltaOrigin(freedomOnRoot, meanOnRoot)

  capturer.emit('gesturestart', {
    travel: 0, // px
    duration: 0, // ms
    component: gestureState.component,
    target: gestureState.target,
    mean: new Point(root, meanOnRoot),
    transform: new Transform(root, I),
    transformOrigin: new Point(root, { x: 0, y: 0 }),
    delta: new Transform(root, I),
    deltaOrigin: new Point(root, deltaOriginOnRoot),
    altKey: modifiers.altKey,
    ctrlKey: modifiers.ctrlKey,
    metaKey: modifiers.metaKey,
    shiftKey: modifiers.shiftKey
  })
}
