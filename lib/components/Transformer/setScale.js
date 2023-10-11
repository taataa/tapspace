const plane3 = require('affineplane').plane3

module.exports = function (scale, origin) {
  // @Transformer:setScale(scale[, origin])
  //
  // Dilate this basis so that its scale matches the given scale.
  // The dilation is performed about the given origin point.
  //
  // Parameters:
  //   scale
  //     a Scale or number. If number, it is relative to the parent plane.
  //   origin
  //     optional Point, the transform origin for the dilation.
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  const scaleType = typeof scale
  if (scaleType === 'object') {
    if (scale.transitRaw) {
      scale = scale.transitRawOuter(this)
    } else {
      throw new Error('Invalid scale')
    }
  } else if (scaleType !== 'number') {
    throw new Error('Invalid scale')
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
    this.scaleBy(m, origin)
  }

  return this
}
