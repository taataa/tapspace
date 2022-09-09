module.exports = (freedom, plane) => {
  // Normalise freedom parameter on the root.
  //
  const result = {
    type: freedom.type
  }

  // Normalise freedom center
  if (freedom.center) {
    result.center = plane.at(freedom.center)
  }

  // TODO Normalise angle
  if (freedom.angle) {
    result.angle = freedom.angle
  }

  return result
}
