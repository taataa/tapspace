const Point = require('../../geometry/Point')

module.exports = function () {
  // Get the position of the plane anchor on the parent.
  // Null if there is no parent.
  //
  // Return
  //   a Point. Null if no parent.
  //

  const par = this.getParent()

  if (par) {
    return new Point(par, this.position.x, this.position.y)
  }

  return null
}
