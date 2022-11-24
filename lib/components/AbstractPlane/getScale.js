const Scale = require('../../geometry/Scale')

module.exports = function () {
  // @Plane:getScale()
  //
  // The scale of the plane.
  //
  // Return
  //   a Scale
  //
  return new Scale(this, 1)
}
