const vector2 = require('../geom/vector2')
const projectionBetween = require('../dom/projectionBetween')
const applyTransform = require('../dom/applyTransform')
const applyAnimatedTransform = require('../dom/applyAnimatedTransform')

module.exports = function (translation, opts) {
  // Parameters
  //   translation
  //     a vector
  //   opts
  //
  if (translation.basis) {
    const proj = projectionBetween(translation.basis, this.el)
    translation = vector2.changeBasis(proj) // TODO
  }

  // TODO update only after possible delay?
  this.proj.x += translation.x
  this.proj.y += translation.y

  if (opts) {
    applyAnimatedTransform(this.el, this.proj, opts)
  } else {
    applyTransform(this.el, this.proj)
  }

  return this
}