const projections = require('./utils/projections')

module.exports = function () {
  // tapspace.components.AbstractView:perspective()
  //
  // Set viewport projection to perspective.
  // Elements far away in z-dimension are rendered smaller
  // and exhibit motion parallax when viewport is panned.
  //
  // Return
  //   this, for chaining
  //
  this.projection = projections.PERSPECTIVE

  // TODO render?

  return this
}
