const Circle = require('../../geometry/Circle')

module.exports = function () {
  // @BlockComponent:getBoundingCircle()
  //
  // Get the bounding circle of the block.
  //
  // Return:
  //   a Circle
  //
  const size = this.getSize().getRaw()
  const w = size.w / 2
  const h = size.h / 2
  const rad = Math.sqrt(w * w + h * h)

  const circle = { x: w, y: h, z: 0, r: rad }

  return new Circle(this, circle)
}
