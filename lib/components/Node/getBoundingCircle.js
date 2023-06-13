const Circle = require('../../geometry/Circle')

module.exports = function () {
  // @Node:getBoundingCircle()
  //
  // Get the bounding circle of the node.
  // Takes in account the circle shape of the node.
  //
  // Return:
  //   a Circle
  //
  const r = this.size.w / 2

  const sphere = { x: r, y: r, z: 0, r: r }

  return new Circle(this, sphere)
}
