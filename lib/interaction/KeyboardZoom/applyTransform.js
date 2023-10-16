module.exports = function (direction) {
  // @KeyboardZoom:applyTransform(direction)
  //
  // Parameters:
  //   direction
  //     a number, +1 or -1
  //

  if (this.source.isViewport) {
    // Normalize direction so that positive dir always means zooming in.
    const dir = (this.step >= 1 ? -Math.sign(direction) : Math.sign(direction))

    const factor = Math.pow(this.step, dir)
    this.target.scaleBy(factor, this.source.atAnchor())

    this.source.emit('keyzoom')
  }
}
