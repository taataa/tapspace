module.exports = function (position) {
  // tapspace.components.AbstractView:moveCenterTo(position)
  //
  // Translate view so that its middle point matches the given point.
  //
  // Parameters:
  //   position
  //     a Point.
  //     ..The component will be moved on the parent so that
  //     ..the center of the component matches the position.
  //
  // Return
  //   this, for chaining
  //

  this.match({
    source: this.atMid(),
    target: position
  })

  return this
}
