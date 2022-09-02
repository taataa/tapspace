const projections = require('./utils/projections')

module.exports = function () {
  // tapspace.components.AbstractView:orthogonal()
  //
  // Set viewport projection to orthogonal.
  // The z-dimension of elements is disregarded, the space becomes flat.
  // Elements far away appear same size as elements close by.
  //
  // Return
  //   this, for chaining
  //
  this.projection = projections.ORTHOGONAL

  // TODO render?

  return this
}
