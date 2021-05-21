// Linear transformation
// TODO linear, lin2, or tran2
//
// A linear transformation affects only the vectors.
// It cannot be used on points because the points in affine space
// do not have origin. With an origin it is possible.

exports.copy = (lin) => {
  return {
    da: lin.da,
    db: lin.db
  }
}

exports.create = (da, db) => {
  return {
    da: da,
    db: db
  }
}

exports.polar = (scale, rotation) => {
  // Create a linear transformation from scale and rotation.
  // See also vector.polar(magnitude, direction)
  //
  // Parameters
  //   scale
  //     number
  //   rotation
  //     number, angle in radians
  //
  // Return
  //   vector2
  //
  return {
    da: scale * Math.cos(rotation),
    db: scale * Math.sin(rotation)
  }
}

exports.multiply =
exports.combine =
exports.compose = (tr, ts) => {
  // Combine two linear transformations.
  //
  // Parameters:
  //   tr
  //     transformation to be applied last
  //   ts
  //     transformation to be applied first
  //
  // Return
  //   tran2
  //
  return {
    da: tr.da * ts.da - tr.db * ts.db,
    db: tr.db * ts.da + tr.da * ts.db
  }
}
