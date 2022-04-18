
const Rotation = function (basis, r, x, y) {
  // Parameters
  //   basis
  //     HTMLElement or AffineElement
  //   r
  //     a number, rotation in radians
  //   x
  //     a number, center of rotation
  //   y
  //     a number, center of rotation
  //
  if (basis.el) {
    basis = basis.el
  }
  this.basis = basis
  this.r = r
  this.x = x
  this.y = y
}

module.exports = Rotation
