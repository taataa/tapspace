module.exports = function (distance) {
  // @Viewport:perspective(distance)
  //
  // Set viewport projection to perspective.
  // Items far away in z-dimension are rendered smaller
  // and exhibit motion parallax when viewport is panned.
  // Zooming the viewport is implemented via moving the viewport deeper.
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
  // See also @Viewport:perspective
  //
  const distType = typeof distance
  if (distType === 'undefined') {
    distance = 300 // the default
  } else if (distType !== 'number') {
    throw new Error('Invalid distance type.')
  }

  this.cameraDistance = distance
  this.element.style.perspective = Math.abs(Math.round(distance)) + 'px'

  // TODO render transform?

  return this
}
