module.exports = function (target, ratio) {
  // @FrameComponent:transformToFit(target[, ratio])
  //
  // Transform the component so that it fully fits inside the target.
  // In other words, transform so that the target fills the frame entirely.
  // See FrameComponent:transformToFill to fit the target inside the frame.
  //
  // Parameters:
  //   target
  //     a BlockComponent or a Box.
  //   ratio
  //     optional number, default is 1.
  //     .. Kind of a scale relative to available space.
  //     .. Target side length relative to the frame side.
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
