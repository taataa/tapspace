module.exports = function (direction) {
  // @KeyboardZoom:applyTransform(direction)
  //
  // Parameters:
  //   direction
  //     a number, +1 or -1
  //

  if (this.source.isViewport) {
    const dir = Math.sign(direction)

    // just 2d
    const factor = Math.pow(this.step, dir)
    this.target.scaleBy(factor, this.source.atAnchor())

    this.source.emit('keyzoom')
  }
}
