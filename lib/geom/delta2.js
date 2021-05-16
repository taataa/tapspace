exports.add = (d2, e2) => {
  return {
    dx: d2.dx + e2.dx,
    dy: d2.dy + e2.dy
  }
}

exports.copy = (d2) {
  // Parameters
  //   d2
  //     delta2 object
  //
  return {
    dx: d2.dx,
    dy: d2.dy
  }
}

exports.create = (dx, dy) => {
  // Parameters
  //   dx
  //     integer
  //   dy
  //     integer
  //
  return {
    dx: dx,
    dy: dy
  }
}

// exports.distance
// Distance is not on delta vectors

exports.inverse = (d2) => {
  return {
    dx: -d2.dx,
    dy: -d2.dy
  }
}

exports.magnitude = (d2) => {
  // Return float
  return Math.sqrt(d2.dx * d2.dx + d2.dy * d2.dy)
}

exports.max = (d2, e2) => {
  // Maximum of two vectors
  return {
    dx: Math.max(d2.dx, e2.dx),
    dy: Math.max(d2.dy, e2.dy)
  }
}

exports.min = (d2, e2) => {
  // Minimum of two vectors
  return {
    dx: Math.min(d2.dx, e2.dx),
    dy: Math.min(d2.dy, e2.dy)
  }
}

exports.negation = exports.inverse

exports.norm = exports.magnitude

exports.opposite = exports.negation

exports.polar = (magnitude, direction) => {
  // Parameters
  //   magnitude
  //     number
  //   direction
  //     number, angle in radians
  //
  return {
    dx: magnitude * Math.cos(direction),
    dy: magnitude * Math.sin(direction)
  }
}


// exports.rotate = (radians) => { ... }
// TODO Is radians absolute or relative?
