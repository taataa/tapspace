const proj2 = require('affineplane').proj2
const applyTransform = require('../../dom/applyTransform')
const applyAnimatedTransform = require('../../dom/applyAnimatedTransform')

module.exports = function (tran, opts) {
  // Transform (move) the element on its parent.
  //
  // Parameters
  //   tran
  //     a Transform
  //   opts
  //     animation params TODO
  //
  // Return
  //   this, for chaining
  //

  // Normalize the projection here.
  // Allow non-affine parent.
  if (tran.basis) {
    const projHere = tran.basis.getProjectionTo(this)
    tran = proj2.tran2(projHere, tran)
  }
  // Now the transform is on the plane.

  // Move
  this.proj = proj2.compose(this.proj, tran)

  if (opts) {
    applyAnimatedTransform(this.element, this.proj, opts)
  } else {
    applyTransform(this.element, this.proj)
  }

  return this
}
