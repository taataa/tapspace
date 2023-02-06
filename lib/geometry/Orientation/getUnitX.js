module.exports = (Vector) => {
  return function () {
    // @Orientation.getUnitX()
    //
    // Get a unit vector along the x-axis of the orientation.
    //
    // Return
    //   a Vector
    //
    return new Vector(this.basis, {
      x: this.orient.a,
      y: this.orient.b,
      z: 0
    })
  }
}
