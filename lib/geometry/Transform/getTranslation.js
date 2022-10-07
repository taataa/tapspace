module.exports = function () {
  // tapspace.geometry.Transform:getTranslation()
  //
  // Get the translation component of the transform without rotation
  // and scaling.
  //
  // Return
  //   a Transform
  //
  const Transform = this.constructor
  return new Transform(this.basis, {
    a: 1,
    b: 0,
    x: this.helm.x,
    y: this.helm.y,
    z: this.helm.z
  })
}
