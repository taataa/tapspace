module.exports = function () {
  // Get the translation component of the transform without rotation
  // and scaling.
  //
  // Return
  //   a Transform
  //
  const Transform = this.constructor
  return new Transform(this.basis, 1, 0, this.x, this.y)
}