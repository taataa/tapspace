module.exports = function (dist) {
  // @Distance:equal(dist)
  //
  // Test if this distance is strictly equal to the given distance.
  // Strict equality requires strictly equal basis and numerical distance.
  //
  // Parameters:
  //   dist
  //     a Distance
  //
  // Return
  //   a boolean
  //

  if (dist && dist.basis && this.basis === dist.basis) {
    return this.dist === dist.dist
  }

  return false
}
