const projectForTarget = require('./utils/projectForTarget')

module.exports = function (pinchEvent) {
  // @Pinch:applyTransform(pinchEvent)
  //
  // Apply the gesture based on the target type and viewport projection.
  //
  // Parameters:
  //   pinchEvent
  //     a gesture event
  //
  const ev = pinchEvent

  if (this.source.isItem) {
    // ev.delta is a Transform on the viewport.
    // Transforms are locationless. An origin point gives it a location.
    // Think that the transform will be applied at a point.
    this.target.transformBy(ev.delta, ev.deltaOrigin)

    return
  }

  if (this.source.isViewport && this.source.proj === '3d') {
    const viewport = this.source
    // Perspective projection => adjust effect according to target distance.
    let target = ev.target
    if (target === this.target) {
      // The gesture targets the viewport background.
      // target = viewport.findMostDistant()
      // target = viewport.findNearRay(ev.mean)
      target = viewport.navigationBasis
    }

    // Check if space was empty.
    if (target) {
      const deltaHat = projectForTarget(ev.delta.helm, viewport, target)
      this.target.transformBy(deltaHat, ev.deltaOrigin)
    }
    // else the space is empty, the target is null. Do not move.

    return
  }

  if (this.source.isViewport && this.source.proj === '2d') {
    // ev.delta is a Transform on the viewport.
    // Transforms are locationless. An origin point gives it a location.
    // Think that the transform will be applied at a point.
    this.target.transformBy(ev.delta, ev.deltaOrigin)

    return
  }

  throw new Error('Unexpected pinch source')
}
