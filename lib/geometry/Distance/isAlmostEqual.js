const fine = require('affineplane')
const epsilon = fine.epsilon

module.exports = function (distance, tolerance) {
  // @Distance:isAlmostEqual(distance[, tolerance])
  //
  // Test if two distances are equal within tolerance.
  // Basis changes often cause small rounding errors
  // due to floating point arithmetics and those
  // can break strict equality checks.
  //
  // Parameters:
  //   distance
  //     a Distance to compare with this.
  //   tolerance
  //     optional number on this basis. Defaults to affineplane.epsilon
  //
  // Returns:
  //   a boolean
  //

  // Normalize
  if (distance.transitRaw) {
    distance = distance.transitRaw(this.basis)
  }

  if (typeof tolerance !== 'number') {
    tolerance = fine.epsilon
  } else {
    // Ensure positive
    tolerance = Math.abs(tolerance)
  }

  return Math.abs(this.dist - distance) < tolerance
}
