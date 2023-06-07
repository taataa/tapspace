const fine = require('affineplane')
const circle3 = fine.circle3

module.exports = (Box) => {
  return function (basis) {
    // @Circle:getBoundingBox([basis])
    //
    // Get the cuboid boundary of the circle. The boundary is a box
    // that has the same orientation as the given basis.
    //
    // Parameters:
    //   basis
    //     optional Component. Default is this.basis
    //
    // Return:
    //   a Box
    //

    let circle = this.circle
    if (basis) {
      const tran = this.basis.getTransitionTo(basis)
      circle = circle3.transitFrom(circle, tran)
    } else {
      basis = this.basis
    }
    // circle now on basis

    const boundingBox = circle3.boundingBox(circle)
    return new Box(basis, boundingBox)
  }
}
