const Basis = require('../../geometry/Basis')
const affine = require('affineplane')
const dir2 = affine.dir2 // TODO .orient2.fromPolar

module.exports = function (origin, scale, orientation) {
  // @Component:createBasis(origin, scale, orientation)
  //
  // Create a Basis on this component.
  //
  // Parameters
  //   origin
  //     a Point or point2
  //   scale
  //     a Scale or number
  //   orientation
  //     an Orientation or number in radians.
  //
  // Return
  //   a Basis
  //

  // Normalize origin point
  if (origin.transitRaw) {
    origin = origin.transitRaw(this)
  }
  origin.z = origin.z || 0

  // Normalize scale
  if (scale.transitRaw) {
    scale = scale.transitRaw(this)
  }
  // Normalize orientation
  let a, b
  if (typeof orientation === 'number') {
    const v = dir2.fromPolar(orientation)
    a = v.x
    b = v.y
  } else if (typeof orientation === 'object') {
    if (orientation.transitRaw) {
      orientation = orientation.transitRaw(this)
    }
    a = orientation.a
    b = orientation.b
  } else {
    // Default orientation
    a = 1
    b = 0
  }

  return new Basis(this, {
    a: scale * a,
    b: scale * b,
    x: origin.x,
    y: origin.y,
    z: origin.z
  })
}
