module.exports = function (distance) {
  // @Distance:max(distance)
  //
  // Return maximum of the two distances.
  //
  // Parameters:
  //   distance
  //     a Distance to compare.
  //
  // Returns:
  //   a Distance
  //

  let dist = distance
  if (distance.transitRaw) {
    dist = distance.transitRaw(this.basis)
  }

  if (dist <= this.dist) {
    return this
  }
  // else
  return distance
}
