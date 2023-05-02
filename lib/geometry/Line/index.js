const Line = function (basis, line) {
  // @Line(basis, line)
  //
  // A line tensor. The line extends to infinity in two directions.
  //
  // Parameters
  //   basis
  //     a BasisComponent
  //   line
  //     a line3 object `{ origin: <point3>, span: <vec3> }`
  //
  this.basis = basis
  this.line = line
}

module.exports = Line
const proto = Line.prototype
proto.isLine = true
