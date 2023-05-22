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

  if (this.source.isViewport) {
    // ev.delta is a Transform on the viewport.
    // Transforms are locationless. An origin point gives it a location.
    // Think that the transform will be applied at a point.
    this.target.transformBy(ev.delta, ev.deltaOrigin)

    return
  }

  throw new Error('Unexpected pinch source')
}
