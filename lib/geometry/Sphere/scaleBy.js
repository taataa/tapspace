const fine = require('affineplane')
const sphere3 = fine.sphere3

module.exports = function (multiplier, origin) {
  // @Sphere:scaleBy(multiplier, origin)
  //
  // Scale the sphere about an origin point.
  //
  // Parameters:
  //   multiplier
  //     a number, the scaling factor
  //   origin
  //     optional Point, the transform origin. Defaults to sphere center.
  //
  // Return
  //   a Sphere, the scaled sphere
  //

  if (origin) {
    if (origin.transitRaw) {
      origin = origin.transitRaw(this.basis)
    }
  } else {
    origin = sphere3.atCenter(this.sphere)
  }

  const sphere = sphere3.homothety(this.sphere, origin, multiplier)

  const Sphere = this.constructor
  return new Sphere(this.basis, sphere)
}
