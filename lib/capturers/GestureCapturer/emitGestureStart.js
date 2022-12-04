const findAffineTarget = require('./findAffineTarget')
const transitPointers = require('./transitPointers')
const transitFreedom = require('./transitFreedom')
const getCenter = require('./getCenter')
const Transform = require('../../geometry/Transform')
const Point = require('../../geometry/Point')
const I = require('nudged').transform.IDENTITY

module.exports = (capturer, gestureState, firstPointers) => {
  // Make capturer emit a gesture start event.
  //

  // Init state.
  gestureState.startTime = Date.now()
  gestureState.totalTravel = 0
  gestureState.totalTransform = I
  gestureState.target = findAffineTarget(firstPointers)
  // Convert page coords to root (=viewport) coords. See [3].
  gestureState.pointersOnRoot = transitPointers(firstPointers, capturer.root)

  // TODO Track where pointers appear
  // TODO entryPoints = transitPointers(firstPointers, root, component)

  // Normalise freedom arguments onto the root.
  // We must do this every move because the gesture might eventually
  // move the viewport.
  const freedomOnRoot = transitFreedom(capturer.freedom, capturer.root)

  // Compute mean point. The transformation happens at/around this point.
  const center = getCenter(freedomOnRoot, gestureState.pointersOnRoot)
  // TODO separate

  capturer.emit('gesturestart', {
    travel: 0, // px
    duration: 0, // ms
    component: gestureState.component,
    target: gestureState.target,
    transform: new Transform(capturer.root, I),
    delta: new Transform(capturer.root, I),
    center: new Point(capturer.root, center)
    // transformOrigin
    // deltaOrigin
  })
}
