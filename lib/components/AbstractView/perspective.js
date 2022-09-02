const projections = require('./utils/projections')

module.exports = function (distance) {
  // tapspace.components.AbstractView:perspective(distance)
  //
  // Set viewport projection to perspective.
  // Elements far away in z-dimension are rendered smaller
  // and exhibit motion parallax when viewport is panned.
  // Zooming the viewport is implemented via moving the viewport deeper.
  //
  // Parameters:
  //   distance
  //     optional positive number or CSS length string.
  //     The distance of the user from the projection image plane.
  //     Larger values cause smaller perspective effect.
  //
  // Return
  //   this, for chaining
  //
  // See also tapspace.components.AbstractView:perspective
  //
  this.projection = projections.PERSPECTIVE

  const distType = typeof distance

  if (distType === 'undefined') {
    distance = '300px' // the default
  } else if (distType === 'number') {
    distance = Math.abs(Math.round(distance)) + 'px'
  } else if (distType !== 'string') {
    throw new Error('Invalid distance type.')
  }

  this.element.style.perspective = distance

  // TODO render transform?

  return this
}
