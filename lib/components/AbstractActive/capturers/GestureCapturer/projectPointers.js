const proj2 = require('affineplane').proj2

module.exports = (pointers, sourcePlane, targetPlane) => {
  // Project pointer coordinates onto another affine plane.
  //
  // Parameters
  //   pointers
  //     a map: id -> {x,y}
  //   sourcePlane
  //     the affine plane on which the pointers coordinates are.
  //   targetPlane
  //     the affine plane on which to project
  //
  // Return
  //   object, a map: id -> {x, y}
  //

  // Already on the target plane
  if (sourcePlane === targetPlane) {
    return pointers
  }

  // TODO optimize so that we do not need to compute this all the time.
  const pr = sourcePlane.getProjectionTo(targetPlane)

  // Projected pointers
  const result = {}

  let k
  const keys = Object.keys(pointers)
  while (keys.length > 0) {
    k = keys.pop()
    result[k] = proj2.point2(pr, pointers[k])
  }

  return result
}
