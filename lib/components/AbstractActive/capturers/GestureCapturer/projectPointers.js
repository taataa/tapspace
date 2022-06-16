const proj2 = require('affineplane').proj2

module.exports = (pointers, plane) => {
  // Project pointer coordinates on page onto affine root.
  //
  // Parameters
  //   pointers
  //     a map: id -> {x,y}, where x and y are in page coordinates.
  //   plane
  //     the affine root plane, the viewport.
  //
  // Return
  //   object, a map: id -> {x, y}
  //

  // Reusable function that converts page coords to affine points,
  // but reads the conversion arguments from the DOM only once.
  const atPage = plane.atPageFn()

  // Projected pointers
  const result = {}

  let k, p
  const keys = Object.keys(pointers)
  while (keys.length > 0) {
    k = keys.pop()
    p = pointers[k]
    result[k] = atPage(p.x, p.y)
  }

  return result
}
