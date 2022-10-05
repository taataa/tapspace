module.exports = (Direction) => {
  // Use factor pattern to avoid circular dependency.
  return function (basis, vec) {
    // tapspace.geometry.Direction:createFromVector(basis, vec)
    //
    // Parameters
    //   basis
    //     a Component
    //   vec
    //     a Vector, or {x,y,z} relative to the basis.
    //
    // Return
    //   a Direction
    //
    return new Direction(basis, vec)
  }
}
