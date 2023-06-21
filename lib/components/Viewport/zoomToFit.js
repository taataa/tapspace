module.exports = function (target, ratio) {
  // @Viewport:zoomToFit(target[, ratio])
  //
  // Translate the viewport so that it fully fits inside the target.
  // In other words, translate so that the target fills the viewport entirely.
  // See Viewport:zoomToFill to fully fit a target inside the viewport.
  //
  // Parameters:
  //   target
  //     a BlockComponent or a Box.
  //   ratio
  //     optional number, default is 1.
  //     .. Kind of a scale relative to available space.
  //     .. Target side length relative to viewport side.
  //
  // Return
  //   this, for chaining
  //

  const size = this.getSize().getRaw()
  if (size.w >= size.h) {
    // Landscape viewport
    this.match({
      source: [
        this.atMidLeft(),
        this.atMidRight()
      ],
      target: [
        target.atNorm(0, 0.5),
        target.atNorm(1, 0.5)
      ]
    })
  } else {
    // Portrait
    this.match({
      source: [
        this.atTopMid(),
        this.atBottomMid()
      ],
      target: [
        target.atNorm(0.5, 0),
        target.atNorm(0.5, 1)
      ]
    })
  }

  if (!ratio) {
    ratio = 1
  }
  this.scaleBy(1 / ratio, this.atCenter())

  return this
}
