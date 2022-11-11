module.exports = (Vector) => {
  return function () {
    // tapspace.geometry.Transform:getVector()
    //
    // Get the translation component of the transform as a Vector.
    //
    // Return
    //   a Vector
    //
    return new Vector(this.basis, {
      x: this.helm.x,
      y: this.helm.y,
      z: this.helm.z
    })
  }
}
