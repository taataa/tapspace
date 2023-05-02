const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @CircleItem:getDiameter()
  //
  // Get the circle diameter.
  //
  // Returns:
  //   a Distance
  //
  return new Distance(this, this.size.w)
}
