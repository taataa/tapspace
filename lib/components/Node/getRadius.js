const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Node:getRadius()
  //
  // Get the circle radius.
  //
  // Returns:
  //   a Distance
  //
  const r = this.size.w / 2

  return new Distance(this, r)
}
