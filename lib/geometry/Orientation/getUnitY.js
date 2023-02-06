module.exports = (Vector) => {
  return function () {
    // @Orientation.getUnitY()
    //
    // Get a unit vector along the y-axis of the orientation.
    //
    // Return
    //   a Vector
    //
    return new Vector(this.basis, {
      x: -this.orient.b,
      y: this.orient.a,
      z: 0
    })
  }
}
