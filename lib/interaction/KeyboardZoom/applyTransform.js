module.exports = function (direction) {
  // @KeyboardZoom:applyTransform(direction)
  //
  // Parameters:
  //   direction
  //     a number, +1 or -1
  //

  if (this.source.isViewport) {
    const diam = this.source.getDiameter().getRaw()
    const dir = Math.sign(direction)

    if (this.source.isViewport3D) {
      const delta = dir * this.step * diam / 20
      this.target.translateBy({ x: 0, y: 0, z: delta })
    } else {
      // just 2d
      const factor = Math.pow(this.step, dir)
      this.target.scaleBy(factor, this.source.atAnchor())
    }

    this.source.emit('keyzoom')
  }
}
