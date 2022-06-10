const tran2 = require('affineplane').tran2

module.exports = function () {
  // Invert the transform.
  //
  // Return
  //   a Transform
  //
  const Transform = this.constructor
  return new Transform(this.basis, tran2.inverse(this))
}
