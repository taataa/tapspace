module.exports = function (multiplier) {
  // @Distance:scaleBy(multiplier)
  // @Distance:multiply
  //
  // Multiply the distance. Returns new Distance.
  //
  // Parameters
  //   multiplier
  //     a number
  //
  // Return
  //   a Distance
  //
  const Distance = this.constructor
  return new Distance(this.basis, this.dist * multiplier)
}
