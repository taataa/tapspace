// Default epsilon to use when coping with floating point arithmetics.
// JavaScript floating point numbers have 52 bits in mantissa (IEEE-754).
// That is about 16 base10 numbers. Therefore the epsilon should be
// much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.
exports.EPSILON = 0.0000000001

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

exports.inverse = (dtr) => {
  // Return inversed dtransform instance
  // See note 2015-10-26-16-30
  const det = dtr.da * dtr.da + dtr.db * dtr.db
  // Test if singular transformation. These might occur when all the range
  // points are the same, forcing the scale to drop to zero.
  if (Math.abs(det) < exports.EPSILON) {
    throw new Error('Singular transformations cannot be inversed.')
  }

  return {
    da: dtr.da / det,
    db: -dtr.db / det,
    dx: (-dtr.da * dtr.dx - dtr.db * dtr.dy) / det,
    dy: (dtr.db * dtr.dx - dtr.da * dtr.dy) / det
  }
}
