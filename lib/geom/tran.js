// Transform is an affine positive similarity transform that happens
// on a plane (= automorphism).
// To avoid any shearing or non-uniform (=anisotropic) scaling,
// we represent the linear transform portion of the transformation
// with a,b instead of a,b,c,d.

// TODO should tran be a linear transform instead of affine?

// Default epsilon to use when coping with floating point arithmetics.
// JavaScript floating point numbers have 52 bits in mantissa (IEEE-754).
// That is about 16 base10 numbers. Therefore the epsilon should be
// much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.
exports.EPSILON = 0.0000000001

exports.I =
exports.IDENTITY = {
  da: 1,
  db: 0,
  dx: 0,
  dy: 0
}
exports.ROT90 = {
  da: 0,
  db: 1,
  dx: 0,
  dy: 0
}
exports.ROT180 = {
  da: -1,
  db: 0,
  dx: 0,
  dy: 0
}
exports.ROT270 = {
  da: 0,
  db: -1,
  dx: 0,
  dy: 0
}
exports.X2 = {
  da: 2,
  db: 0,
  dx: 0,
  dy: 0
}

exports.copy = (dtr) => {
  return {
    da: dtr.da,
    db: dtr.db,
    dx: dtr.dx,
    dy: dtr.dy
  }
}

exports.create = (da, db, dx, dy) => {
  return {
    da: da,
    db: db,
    dx: dx,
    dy: dy
  }
}

exports.det = (tr) => {
  // Determinant
  // See note 2015-10-26-16-30 for analysis.
  return tr.da * tr.da + tr.db * tr.db
}

exports.invert =
exports.inverse = (tr) => {
  // Return inversed dtransform instance
  // See note 2015-10-26-16-30
  const det = tr.da * tr.da + tr.db * tr.db
  // Test if singular transformation. These might occur when all the range
  // points are the same, forcing the scale to drop to zero.
  if (Math.abs(det) < exports.EPSILON) {
    throw new Error('Singular transformations cannot be inversed.')
  }

  return {
    da: tr.da / det,
    db: -tr.db / det,
    dx: (-tr.da * tr.dx - tr.db * tr.dy) / det,
    dy: (tr.db * tr.dx - tr.da * tr.dy) / det
  }
}

// exports.multiplyRight =
// exports.multiplyBy =
exports.multiply =
exports.combine =
exports.compose = (tr, ts) => {
  // Combine two transformations.
  //
  // Parameters:
  //   tr
  //     transformation to be applied last
  //   ts
  //     transformation to be applied first
  //

  // Matrix multiplication:
  //   tr:         ts:
  //   a -b  x     a -b  x
  //   b  a  y  *  b  a  y
  //   0  0  1     0  0  1
  return {
    a: tr.da * ts.da - tr.db * ts.db,
    b: tr.db * ts.da + tr.da * ts.db,
    x: tr.da * ts.dx - tr.db * ts.dy + tr.dx,
    y: tr.db * ts.dx + tr.da * ts.dy + tr.dy
  }
}
