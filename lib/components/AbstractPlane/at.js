const Point = require('../../geometry/Point')

module.exports = function (x, y) {
  // TODO at(spacePoint) to represent spacePoint on el
  return new Point(this.element, x, y)
}
