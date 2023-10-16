const Orientation = require('../../geometry/Orientation')
const affine = require('affineplane')
const dir2 = affine.dir2 // TODO .orient2.fromPolar

module.exports = function (angle) {
  // @Component:createOrientation(angle)
  //
  // Create an Orientation on this basis.
  //
  // Parameters
  //   angle
  //     a number or orient2 object { a, b }
  //
  // Return
  //   an Orientation
  //

  let a, b
  if (typeof angle === 'number') {
    const v = dir2.fromPolar(angle)
    a = v.x
    b = v.y
  } else if (typeof angle === 'object') {
    a = angle.a
    b = angle.b
  } else {
    // No angle or invalid angle
    a = 1
    b = 0
  }

  return new Orientation(this, { a, b })
}
