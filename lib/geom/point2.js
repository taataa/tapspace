// A point does not have origin.
// A point is a position in affine space.

// exports.add
// Points cannot be added because no origin.
// See .move to add a vector.
//

exports.copy = (p2) => {
  // Parameters
  //   p2
  //     point2 object
  //
  return {
    x: p2.x,
    y: p2.y
  }
}

exports.create = (x, y) => {
  // Parameters
  //   x
  //     integer
  //   y
  //     integer
  //
  return {
    x: x,
    y: y
  }
}

exports.delta = (p2, q2) => {
  // A vector from point p2 to point q2
  //
  // Return
  //   vector2
  //
  return {
    dx: p2.x - q2.x,
    dy: p2.y - q2.y
  }
}

exports.distance = (p2, q2) => {
  // Distance between two points on the same plane.
  const dx = p2.x - q2.x
  const dy = p2.y - q2.y
  return Math.sqrt(dx * dx + dy * dy)
}

exports.equal = (p2, q2) => {
  return p2.x === q2.x && p2.y === q2.y
}

exports.equals = exports.equal

// exports.magnitude
// Points cannot have magnitude because no origin to measure it.
//

// exports.max
// Points cannot have max because no origin to measure to.
//

exports.mean = (p2s) => {
  // Average of the positions
  //
  // Parameters
  //   p2s
  //     array of points
  //
  const n = p2s.length
  if (n > 0) {
    let sumx = 0
    let sumy = 0
    for (let i = 0; i < n; i += 1) {
      sumx += p2s[i].x
      sumy += p2s[i].y
    }
    return {
      x: sumx / n,
      y: sumy / n
    }
  }
  throw new Error('Cannot compute mean for an empty array of points.')
}

// exports.min
// Points cannot have min because no origin to measure to.

exports.move = (p2, v2) => {
  // Parameters:
  //   p2
  //     point2
  //   v2
  //     vector2
  //
  // Return
  //   point2, translated by the vector
  //
  return {
    x: p2.x + v2.dx,
    y: p2.y + v2.dy
  }
}

// exports.norm = exports.magnitude
// Points cannot have norm because no origin to measure it.
//

// exports.opposite
// Points cannot have opposite because no origin to oppose to.
//

// exports.rotation
// Points cannot have rotation because no origin to rotate about.
