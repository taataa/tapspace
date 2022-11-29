module.exports = function (position) {
  // @Block:moveCenterTo(position)
  //
  // Translate the block so that its middle point matches the given point.
  //
  // Parameters:
  //   position
  //     a Point, or a point2 { x, y } on the parent basis.
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
