module.exports = function (maxDistance) {
  // @Viewport:findWithinDistance(maxDistance)
  //
  // Find all nearby components within a distance measured from
  // the viewport camera to the component anchor.
  //
  // Parameters:
  //   maxDistance
  //     a Distance or a number in viewport pixels. The radius from camera.
  //
  // Return
  //   an array of TransformerComponent.
  //   .. Will be empty array if space is empty or
  //   .. if no components within the radius.
  //

  // Normalize
  if (maxDistance.transitRaw) {
    maxDistance = maxDistance.transitRaw(this)
  }

  return this.measureAll().filter((measure) => {
    return measure.distancePx <= maxDistance
  }).map((measure) => {
    // Return only the components
    return measure.target
  })
}
