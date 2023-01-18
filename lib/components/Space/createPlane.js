const Plane = require('../Plane')

module.exports = function (position) {
  // @Space:createPlane(position)
  //
  // Create a plane at the position and make it a child of this space.
  //
  // Return
  //   a Plane
  //
  const subplane = new Plane()

  this.addChild(subplane, position)

  return subplane
}
