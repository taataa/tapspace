const Orientation = require('../../geometry/Orientation')

module.exports = function () {
  // @Component:getOrientation()
  //
  // Get the orientation of this component.
  // Provides a way to match the orientation between components.
  //
  // Return
  //   an Orientation
  //
  return new Orientation(this, { a: 1, b: 0 })
}
