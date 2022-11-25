module.exports = function (position) {
  // @Block:moveCenterTo(position)
  //
  // Translate the block so that its middle point matches the given point.
  //
  // Parameters:
  //   position
  //     a point { x, y } on the parent or a Point. Required.
  //     ..The block will be moved on the parent so that
  //     ..the center of the block matches the position.
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