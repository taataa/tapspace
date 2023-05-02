const Distance = require('../Distance')

module.exports = function () {
  // @Box:getDiagonal()
  //
  // Get box diagonal as a distance.
  //
  // Return
  //   a Distance
  //

  const w = this.box.w
  const h = this.box.h
  const diag = Math.sqrt(w * w + h * h)
  return new Distance(this.basis, diag)
}
