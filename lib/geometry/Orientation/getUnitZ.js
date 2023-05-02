module.exports = (Vector) => {
  return function () {
    // @Orientation.getUnitY()
    //
    // Get a unit vector along the z-axis of the orientation.
    //
    // Return
    //   a Vector
    //
    return new Vector(this.basis, {
      x: 0,
      y: 0,
      z: 1
    })
  }
}
