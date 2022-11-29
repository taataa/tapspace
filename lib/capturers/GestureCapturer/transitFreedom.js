module.exports = (freedom, plane) => {
  // Normalise freedom parameter onto the root.
  // The result contains only raw geometry objects without basis.
  //
  const result = {
    type: freedom.type
  }

  // Normalise freedom center
  if (freedom.center) {
    result.center = plane.at(freedom.center).point
  }

  // TODO Normalise angle
  if (freedom.angle) {
    result.angle = freedom.angle
  }

  return result
}
