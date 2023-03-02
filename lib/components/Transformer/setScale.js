const plane3 = require('affineplane').plane3

module.exports = function (scale, pivot) {
  // @Transformer:setScale(scale[, pivot])
  //
  // Dilate this basis so that its scale matches the given scale.
  // The dilation is performed about the given pivot point.
  //
  // Parameters:
  //   scale
  //     a Scale or number. If number, it is relative to the parent plane.
  //   pivot
  //     optional Point, the transform origin for the dilation.
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (scale.transitRaw) {
    scale = scale.transitRawOuter(this)
  }
  // assert: scale is number

  const oldScale = plane3.getScale(this.tran)
  // Solve: oldScale * m = scale
  // <=> m = scale / oldScale, oldScale != 0

  if (oldScale === 0) {
    // Singular plane. Rotation cannot be determined.
    this.tran = {
      a: scale,
      b: 0,
      x: this.tran.x,
      y: this.tran.y,
      z: this.tran.z
    }

    this.renderTransform()
  } else {
    // Non-singular plane. Find scale difference.
    const m = scale / oldScale
    this.scaleBy(m, pivot)
  }

  return this
}
