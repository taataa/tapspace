module.exports = function (position) {
  // @Plane:createPlane(position)
  //
  // Add a subplane.
  //
  // Return
  //   a Plane
  //
  const Plane = this.constructor
  const subplane = new Plane()

  this.addChild(subplane, position)

  return subplane
}
