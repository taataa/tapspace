const epsilon = require('affineplane').epsilon

module.exports = function (target, ratio) {
  // @Viewport:zoomToFill(target[, ratio])
  //
  // Translate and scale the viewport so that it fully contains the target.
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

  // If the target is Composite, it does not have normalized coordinates.
  // Therefore we use bounding box and its corners.
  const boxOrientation = this.getOrientation()
  const targetBox = target.getBoundingBox(boxOrientation).changeBasis(this)

  // If the target has zero size, we cannot zoom into it
  // without singular inversions. Fall back to re-centering.
  const targetArea = targetBox.getArea().getRaw()
  if (targetArea < epsilon) {
    this.translateTo(target.at(0, 0))
    return this
  }

  const size = this.getSize().getRaw()
  if (size.w >= size.h) {
    // Landscape
    this.match({
      source: [
        this.atTopMid(),
        this.atBottomMid()
      ],
      target: [
        targetBox.atNorm(0.5, 0),
        targetBox.atNorm(0.5, 1)
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
        targetBox.atNorm(0, 0.5),
        targetBox.atNorm(1, 0.5)
      ]
    })
  }

  if (!ratio) {
    ratio = 1
  }
  this.scaleBy(1 / ratio, this.atCenter())

  return this
}
