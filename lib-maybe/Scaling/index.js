
const Scaling = function (basis, s, x, y) {
  // Parameters
  //   basis
  //     HTMLElement or AffineElement
  //   s
  //     a number, scaling multiplier
  //   x
  //     a number, center of scaling
  //   y
  //     a number, center of scaling
  //
  if (basis.el) {
    basis = basis.el
  }
  this.basis = basis
  this.s = s
  this.x = x
  this.y = y
}

module.exports = Scaling
