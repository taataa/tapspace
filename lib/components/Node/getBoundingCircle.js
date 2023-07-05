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

  const circle = { x: r, y: r, z: 0, r }

  return new Circle(this, circle)
}
