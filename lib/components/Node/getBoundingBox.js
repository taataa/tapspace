const Box = require('../../geometry/Box')

module.exports = function (orientation) {
  // @Node:getBoundingBox([orientation])
  //
  // Get the bounding box of the node.
  // Takes into account the circle shape of the node.
  //
  // Parameters:
  //   orientation
  //     an Orientation. Determines the angle of the box.
  //
  // Return:
  //   a Box
  //
  const d = this.size.w

  if (!orientation) {
    const box = { a: 1, b: 0, x: 0, y: 0, z: 0, w: d, h: d, d: 0 }
    return new Box(this, box)
  }

  // Normalize
  const orient = orientation.transitRaw(this)

  // Custom orientation.
  const r = d / 2
  return new Box(this, {
    a: orient.a,
    b: orient.b,
    x: -r * orient.a + r * orient.b + r,
    y: -r * orient.b - r * orient.a + r,
    z: 0,
    w: d,
    h: d,
    d: 0
  })
}
