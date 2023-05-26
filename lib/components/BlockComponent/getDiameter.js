const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @BlockComponent:getDiameter()
  //
  // Get the block diameter, from corner to opposite corner.
  //
  // Return
  //   a Distance
  //
  const size = this.getSize().size
  const w = size.w
  const h = size.h
  return new Distance(this, Math.sqrt(w * w + h * h))
}
