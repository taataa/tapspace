const Scale = require('../../geometry/Scale')

module.exports = function () {
  // @Component:getScale()
  //
  // The scale of the basis.
  //
  // Return
  //   a Scale
  //
  return new Scale(this, 1)
}
