// const fine = require('affineplane')
// const box3 = fine.box3

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
        viewport.atTopMid(),
        viewport.atBottomMid()
      ],
      target: [
        target.atTopMid(),
        target.atBottomMid()
      ]
    })
  } else {
    // Portrait
    this.match({
      source: [
        viewport.atMidLeft(),
        viewport.atMidRight()
      ],
      target: [
        target.atMidLeft(),
        target.atMidRight()
      ]
    })
  }

  if (!ratio) {
    ratio = 1
  }
  this.scaleBy(1 / ratio, viewport.atCenter())

  return this
}
