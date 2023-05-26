const point3 = require('affineplane').point3

module.exports = function (basis) {
  // @Point:transitRawOuter(basis)
  //
  // Represent the point in the outer basis of the element.
  // Unlike changeBasis, returns a plain object without basis data.
  // This corresponds to `Point:changeBasis(basis.getParent()).getRaw()`
  // but is more efficient and does not require the affine parent to exist.
  //
  // Parameters:
  //   basis
  //     a Component
  //
  // Return
  //   a point3, an object.
  //

  // Transition from this to the outer basis.
  const tran = this.basis.getTransitionToParentOf(basis)
  // The tran is equivalent to a plane represented in the outer basis.
  return point3.transitFrom(this.point, tran)
}
