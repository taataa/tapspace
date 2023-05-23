const Basis = require('../../geometry/Basis')

module.exports = function () {
  // @Component:getBasis()
  //
  // Get the virtual basis of this component.
  // Provides a way to construct new bases via transformations without
  // transforming the component itself. Can also be used to match bases
  // between components.
  //
  // Example:
  // ```
  // > const basis = item.getBasis().rotateByDegrees(45)
  // > anotherItem.setBasis(basis)
  // ```
  //
  // Return
  //   a Basis
  //
  return new Basis(this, { a: 1, b: 0, x: 0, y: 0, z: 0 })
}
