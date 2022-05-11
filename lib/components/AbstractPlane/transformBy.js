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

  // Project the transform onto the parent.
  // TODO allow transform even when non-affine parent
  if (tran.basis) {
    const pr = tran.basis.getProjectionTo(this.element.parentElement)
    tran = proj2.tran2(pr, tran)
  }

  // Move
  this.proj = proj2.compose(this.proj, tran)

  if (opts) {
    applyAnimatedTransform(this.element, this.proj, opts)
  } else {
    applyTransform(this.element, this.proj)
  }

  return this
}
