const factor = Math.PI / 180

module.exports = function (degrees, origin) {
  // @Basis:rotateByDegrees(degrees[, origin])
  //
  // Rotate the basis around the z-axis that intersects the origin point.
  //
  // Parameters:
  //   degrees
  //     a number, the amount to rotate in degrees.
  //   origin
  //     optional Point, the transform origin. Defaults to the basis origin.
  //
  // Return
  //   a Basis, the rotated basis
  //
  if (typeof degrees !== 'number') {
    throw new Error('Invalid rotation angle: ' + degrees)
  }

  const rads = degrees * factor
  return this.rotateBy(rads, origin)
}
