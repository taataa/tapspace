module.exports = function (distance) {
  // @Distance:isLessThan(distance)
  //
  // Test if this is less than the given distance.
  //
  // Parameters:
  //   distance
  //     a Distance
  //
  // Return
  //   a boolean
  //
  if (distance.transitRaw) {
    distance = distance.transitRaw(this.basis)
  }

  return this.dist < distance
}
