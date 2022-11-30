module.exports = (freedom, plane) => {
  // Normalise freedom parameter onto the root.
  // The result contains only raw geometry objects without basis.
  //
  const result = {
    type: freedom.type
  }

  // Normalise freedom pivot
  if (freedom.pivot) {
    result.pivot = plane.at(freedom.pivot).point
  }

  // TODO Normalise angle
  if (freedom.angle) {
    result.angle = freedom.angle
  }

  return result
}
