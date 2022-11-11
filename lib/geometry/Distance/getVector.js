const fine = require('affineplane')
const dir3 = fine.dir3

module.exports = (Vector) => {
  return function (dir) {
    // tapspace.geometry.Distance:getVector(dir)
    //
    // Parameters:
    //   dir
    //     a Direction
    //
    // Return
    //   a Vector
    //

    // Normalize direction
    if (dir.transitRaw) {
      dir = dir.transitRaw(this.basis)
    }

    const vec = dir3.toVector(dir, this.dist)

    return new Vector(this.basis, vec)
  }
}
