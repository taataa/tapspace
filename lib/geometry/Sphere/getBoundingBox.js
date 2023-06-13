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
    //     optional Component. Default is this.basis
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

    const boundingBox = sphere3.boundingBox(sphere)
    return new Box(basis, boundingBox)
  }
}
