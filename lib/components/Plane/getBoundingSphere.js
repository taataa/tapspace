const Sphere = require('../../geometry/Sphere')

module.exports = function () {
  // @Plane:getBoundingSphere()
  //
  // Get bounding sphere of the content on the plane.
  //
  // Return
  //   a Sphere
  //

  const contents = this.getDescendants()
  const points = []

  // Avoid recursive bounding box computation because
  // rotations cause corners that will stack up and make
  // the boundary bigger than necessary.
  for (let i = 0; i < contents.length; i += 1) {
    if (contents[i].isBlockComponent) {
      points.push(contents[i].atNorm(0, 0))
      points.push(contents[i].atNorm(0, 1))
      points.push(contents[i].atNorm(1, 0))
      points.push(contents[i].atNorm(1, 1))
    }
  }

  return Sphere.fromPoints(this, points)
}
