module.exports = function (basis) {
  // @Block:getBoundingBox([basis])
  //
  // Get the bounding box of the block in the given basis.
  // The box will be orthogonal with the basis.
  //
  // Parameters:
  //   optional Basis. Default is this.
  //
  // Return:
  //   a Box
  //
  const size = this.getSize().getRaw()
  const depth = 0
  const box = { a: 1, b: 0, x: 0, y: 0, w: size.w, h: size.h, d: 0 }
  return new Box(this, box)
}
