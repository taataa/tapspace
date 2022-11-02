module.exports = function () {
  // tapspace.components.AbstractView:orthogonal()
  //
  // Set viewport projection to orthogonal.
  // The z-dimension of elements is disregarded, the space becomes flat.
  // Elements far away appear same size as elements close by.
  // Zooming the viewport is implemented via scaling.
  //
  // See also tapspace.components.AbstractView:perspective
  //
  // Return
  //   this, for chaining
  //
  this.cameraDistance = null
  this.element.style.perspective = 'none'

  // TODO render transform?

  return this
}
