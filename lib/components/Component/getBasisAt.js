const Basis = require('../../geometry/Basis')

module.exports = function (origin) {
  // @Component:getBasisAt(origin)
  //
  // Get a virtual basis on this component.
  // The basis has same scale and orientation as the viewport but
  // matches the given origin point.
  //
  // Example:
  // ```
  // > const basis = item.getBasisAt(item.atBottomLeft())
  // > anotherItem.setBasis(basis)
  // ```
  //
  // Parameters:
  //   origin
  //     a Point
  //
  // Return
  //   a Basis
  //
  if (origin.transitRaw) {
    origin = origin.transitRaw(this)
  }
  return new Basis(this, {
    a: 1,
    b: 0,
    x: origin.x,
    y: origin.y,
    z: origin.z
  })
}
