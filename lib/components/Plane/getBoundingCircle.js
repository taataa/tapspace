const Circle = require('../../geometry/Circle')

module.exports = function () {
  // @Plane:getBoundingCircle()
  //
  // Get bounding circle of the content on the plane.
  //
  // Return
  //   a Circle
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

  return Circle.fromPoints(this, points)
}
