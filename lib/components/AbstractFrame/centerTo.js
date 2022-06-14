module.exports = function (position) {
  // Move component so that its middle point matches the given point.
  // Let the position f component on the parent.
  // This moves the component anchor to the given position
  // and rotates and scales the component as specified.
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
