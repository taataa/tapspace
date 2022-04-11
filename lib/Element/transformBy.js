const proj = require('../geom/proj')
const projectionBetween = require('../dom/projectionBetween')
const applyTransform = require('../dom/applyTransform')
const applyAnimatedTransform = require('../dom/applyAnimatedTransform')

module.exports = function (tran, opts) {
  // Transform (move) the element on its parent.
  //
  // Parameters
  //   tran
  //     a Transform
  //   opts
  //
  // Return
  //   this, for chaining
  //

  // Project the transform onto the parent.
  // TODO allow transform even when non-affine parent
  if (tran.basis) {
    const pr = projectionBetween(tran.basis, this.el.parentElement)
    tran = proj.tran4(pr, tran)
  }

  // Move
  this.proj = proj.compose(this.proj, tran)

  if (opts) {
    applyAnimatedTransform(this.el, this.proj, opts)
  } else {
    applyTransform(this.el, this.proj)
  }

  return this
}