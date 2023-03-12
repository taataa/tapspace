const sphere3 = require('affineplane').sphere3
const Volume = require('../Volume')

module.exports = function () {
  // @Sphere:getVolume()
  //
  // Get the volume of the sphere.
  //
  // Return
  //   a Volume
  //
  const vol = sphere3.volume(this.sphere)
  return new Volume(this.basis, vol)
}
