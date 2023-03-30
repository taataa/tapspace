module.exports = function (maxDistance) {
  // @Viewport:findWithinDistance(maxDistance)
  //
  // Find all nearby planes within a distance measured from
  // the viewport camera to plane anchor.
  //
  // Parameters:
  //   maxDistance
  //     a Distance or a number in viewport pixels. The radius from camera.
  //
  // Return
  //   an array of Plane.
  //   .. Will be empty array if space is empty or no planes within the radius.
  //

  // Normalize
  if (maxDistance.transitRaw) {
    maxDistance = maxDistance.transitRaw(this)
  }

  return this.measureAll().filter((measure) => {
    return measure.distancePx <= maxDistance
  }).map((measure) => {
    // Return only the planes
    return measure.plane
  })
}
