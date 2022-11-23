const plane3 = require('affineplane').plane3

module.exports = function (scale) {
  // AbstractPlane:setScale(scale)
  //
  // Dilate this plane so that its scale matches
  // the given scale. The dilation is performed about the plane anchor.
  //
  // Parameters:
  //   scale
  //     a Scale or number. If number, it is relative to the parent plane.
  //
  // Return
  //   this, for chaining
  //

  if (scale.transitRaw) {
    scale = scale.transitRaw(this.getParent())
  }
  // assert: scale is number

  const oldScale = plane3.getScale(this.tran)
  // Solve: oldScale * m = scale
  // <=> m = scale / oldScale, oldScale != 0

  // TODO overwrite scale if oldScale = 0

  const m = scale / oldScale

  this.scaleBy(m)

  return this
}
