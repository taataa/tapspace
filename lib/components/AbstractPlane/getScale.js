const Scale = require('../../geometry/Scale')

module.exports = function () {
  // tapspace.components.AbstractPlane:getScale()
  //
  // The scale of the plane.
  //
  // Return
  //   a Scale
  //
  return new Scale(this, 1)
}
