module.exports = function (distance) {
  // @Viewport:setPerspective(distance)
  //
  // Set viewport camera distance. The value determines the perspective.
  // Items far away in z-dimension are rendered smaller
  // and exhibit motion parallax when viewport is panned.
  // Zooming the viewport is implemented via moving the viewport deeper
  // in z dimension.
  //
  // Parameters:
  //   distance
  //     optional positive number. Default 300.
  //     The distance of the user from the projection image plane
  //     .. measured in the units of the image plane.
  //     Larger values cause smaller perspective effect.
  //
  // Return
  //   this, for chaining
  //

  if (!distance) {
    distance = 300 // the default
  }
  if (distance.transitRaw) {
    // a Distance
    distance = distance.transitRaw(this)
  }

  if (typeof distance !== 'number') {
    throw new Error('Invalid distance type.')
  }

  // Ensure positive
  distance = Math.max(1, distance)

  this.cameraDistance = distance
  this.element.style.perspective = Math.abs(Math.round(distance)) + 'px'

  // TODO render transform? Maybe some ad-hoc rendering depends on cam dist?

  return this
}
