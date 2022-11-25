module.exports = function () {
  // @Viewport:orthogonal()
  //
  // Set viewport projection to orthogonal.
  // The z-dimension of elements is disregarded, the space becomes flat.
  // Items far away appear same size as items close by.
  // Zooming the viewport is implemented via scaling.
  //
  // See also @Viewport:perspective
  //
  // Return
  //   this, for chaining
  //
  this.cameraDistance = null
  this.element.style.perspective = 'none'

  // TODO render transform?

  return this
}
