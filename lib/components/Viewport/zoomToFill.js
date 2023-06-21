module.exports = function (target, ratio) {
  // @Viewport:zoomToFill(target[, ratio])
  //
  // Transform the viewport so that it fully contains the target.
  // In other words, transform so that the target fits inside the viewport.
  // See Viewport:zoomToFit to fully fit the viewport inside a target.
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
    // Landscape
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
  } else {
    // Portrait
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
  }

  if (!ratio) {
    ratio = 1
  }
  this.scaleBy(1 / ratio, this.atCenter())

  return this
}
