const plane3 = require('affineplane').plane3

module.exports = (Transform) => {
  // Use factory pattern to control circular dependency.
  return function (b) {
    // @Basis:getTransformTo(b)
    //
    // Get a transform from this to the basis b.
    // The resulting transformation would transform this basis
    // to the given basis when applied to the origin.
    //
    // Parameters:
    //   b
    //     a Basis
    //
    // Return:
    //   a Transform on this basis.
    //

    // Normalize to plane3
    if (b.transitRaw) {
      b = b.transitRaw(this.basis)
    }

    const bOnThis = plane3.transitTo(b, this.tran)
    return new Transform(this.basis, bOnThis)
  }
}
