const Point = require('../Point')

module.exports = function (x, y) {
  // TODO at(spacePoint) to represent spacePoint on el
  return new Point(this.el, x, y)
}
