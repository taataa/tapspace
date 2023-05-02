const Volume = require('../Volume')

module.exports = function () {
  // @Box:getVolume()
  //
  // Get the volume of the box.
  //
  // Return
  //   a Volume
  //

  const vol = this.box.w * this.box.h * this.box.d

  return new Volume(this.basis, vol)
}
