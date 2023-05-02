module.exports = (Direction) => {
  // Use factory pattern to control circular dependency.
  return function () {
    // @Vector:getDirection()
    //
    // Get vector direction.
    //
    // Return
    //   a Direction
    //
    return Direction.createFromVector(this.basis, this.vec)
  }
}
