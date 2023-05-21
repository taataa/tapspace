const projectionTypes = ['2d', '3d']

module.exports = function (projectionType) {
  // @Viewport:projection(type)
  // @Viewport:setProjection
  //
  // Change viewport projection between 2D and 3D.
  // Maybe in future there are other projections as well.
  //
  // Parameters:
  //   type
  //     a string, '2d' or '3d'
  //
  // Return:
  //   this, for chaining
  //

  // Normalize
  projectionType = projectionType.toLowerCase()

  if (projectionTypes.includes(projectionType)) {
    this.proj = projectionType

    // Reset class name
    projectionTypes.forEach(t => {
      const className = 'affine-viewport-' + t
      this.element.classList.remove(className)
    })
    const className = 'affine-viewport-' + this.proj
    this.element.classList.add(className)
  }

  return this
}
