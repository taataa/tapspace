// TODO use orient2.equal

module.exports = function (orient) {
  // @Orientation:equal(orient)
  //
  // Test if this orientation is strictly equal to a given orientation.
  // Strict equality requires identical basis and orientation values.
  //
  // Parameters:
  //   orient
  //     an Orientation
  //
  // Return
  //   a boolean
  //

  if (orient && orient.basis && this.basis === orient.basis) {
    return this.orient.a === orient.orient.a && this.orient.b === orient.orient.b
  }

  return false
}
