const projectionBetween = require('../../dom/projectionBetween')
const proj = require('../../geom/proj')

module.exports = (pointers, sourceEl, targetEl) => {
  // Project pointer coordinates onto another affine element.
  //
  // Parameters
  //   pointers
  //     a map: id -> {x,y}
  //   sourcePlane
  //     the affine HTMLElement on which the pointers coordinates are.
  //   targetPlane
  //     the affine HTMLElement on which to project
  //
  // Return
  //   object, a map: id -> [x, y]
  //

  // Already on the target plane
  if (sourceEl === targetEl) {
    return pointers
  }

  // TODO optimize so that we do not need to compute this all the time.
  const pr = projectionBetween(sourceEl, targetEl)

  // Projected pointers
  const result = {}

  let k
  const keys = Object.keys(pointers)
  while (keys.length > 0) {
    k = keys.pop()
    result[k] = proj.point2(pr, pointers[k])
  }

  return result
}
