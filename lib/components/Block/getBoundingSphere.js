const Sphere = require('../../geometry/Sphere')

module.exports = function () {
  // @Block:getBoundingSphere()
  //
  // Get the bounding sphere of the block.
  //
  // Return:
  //   a Sphere
  //
  const size = this.getSize().getRaw()
  const hw = size.w / 2
  const hh = size.h / 2
  const hd = size.d / 2
  const rad = Math.sqrt(hw * hw + hh * hh)

  const sphere = { x: hw, y: hh, z: hd, r: rad }

  return new Sphere(this, sphere)
}
