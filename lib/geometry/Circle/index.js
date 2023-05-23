const Circle = function (basis, circle) {
  // @Circle(basis, circle)
  //
  // A circle tensor. The circle is a flat round shape in 3D space.
  //
  // Parameters
  //   basis
  //     a Component
  //   circle
  //     a circle3 object `{ x, y, z, r }`
  //
  this.basis = basis
  this.circle = circle
}

module.exports = Circle
const proto = Circle.prototype
proto.isCircle = true
