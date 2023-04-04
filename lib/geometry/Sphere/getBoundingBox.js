const fine = require('affineplane')
const sphere3 = fine.sphere3

module.exports = (Box) => {
  return function (basis) {
    // @Sphere:getBoundingBox([basis])
    //
    // Get the cuboid boundary of the sphere. The boundary is a box
    // that has the same orientation as the given basis.
    //
    // Parameters:
    //   basis
    //     optional BasisElement. Default is this.basis
    //
    // Return:
    //   a Box
    //

    let sphere = this.sphere
    if (basis) {
      const tran = this.basis.getTransitionTo(basis)
      sphere = sphere3.transitFrom(sphere, tran)
    } else {
      basis = this.basis
    }
    // sphere now on basis

    // TODO use sphere3.boundingBox(sphere)
    const size = sphere.r * 2
    const boundingBox = {
      a: 1,
      b: 0,
      x: sphere.x - sphere.r,
      y: sphere.y - sphere.r,
      z: sphere.z - sphere.r,
      w: size,
      h: size,
      d: size
    }

    return new Box(basis, boundingBox)
  }
}
