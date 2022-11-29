module.exports = (Direction) => {
  // Use factor pattern to avoid circular dependency.
  return function (basis, vec) {
    // tapspace.geometry.Direction:fromVector(basis, vec)
    //
    // Create a Direction from a vector.
    //
    // Parameters
    //   basis
    //     a Basis
    //   vec
    //     a Vector, or {x,y,z} relative to the basis.
    //
    // Return
    //   a Direction
    //
    return new Direction(basis, vec)
  }
}
