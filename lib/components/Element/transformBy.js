const proj2 = require('affineplane').proj2
const projectionBetween = require('../../dom/projectionBetween')
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
    const pr = projectionBetween(tran.basis, this.el.parentElement)
    tran = proj2.tran2(pr, tran)
  }

  // Move
  this.proj = proj2.compose(this.proj, tran)

  if (opts) {
    applyAnimatedTransform(this.el, this.proj, opts)
  } else {
    applyTransform(this.el, this.proj)
  }

  return this
}