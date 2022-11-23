module.exports = function (multiplier) {
  // tapspace.geometry.Scale:scaleBy(multiplier)
  //
  // Multiply the scale. Returns new Scale.
  //
  // Parameters
  //   multiplier
  //     a number
  //
  // Return
  //   a Scale
  //
  const Scale = this.constructor
  return new Scale(this.basis, this.m * multiplier)
}
