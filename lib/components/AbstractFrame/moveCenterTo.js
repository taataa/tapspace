module.exports = function (position) {
  // tapspace.components.AbstractFrame:moveCenterTo(position)
  //
  // Translate component so that its middle point matches the given point.
  //
  // Parameters:
  //   position
  //     a point { x, y } on the parent or a Point. Required.
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
