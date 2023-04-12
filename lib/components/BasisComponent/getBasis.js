const Basis = require('../../geometry/Basis')

module.exports = function () {
  // @BasisComponent:getBasis()
  //
  // Get the virtual basis of this component.
  // Provides a way to match the basis between components.
  //
  // Return
  //   a Basis
  //
  return new Basis(this, { a: 1, b: 0, x: 0, y: 0, z: 0 })
}
