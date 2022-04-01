const vector2 = require('../geom/vector2')
const projectionBetween = require('./lib/projectionBetween')
const applyTransform = require('./lib/applyTransform')
const applyAnimatedTransform = require('./lib/applyAnimatedTransform')

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
  this.tr.x += translation.x
  this.tr.y += translation.y

  if (opts) {
    applyAnimatedTransform(this.el, this.tr, opts)
  } else {
    applyTransform(this.el, this.tr)
  }

  return this
}
