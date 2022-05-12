const vector2 = require('affineplane').vector2
const applyTransform = require('../../dom/applyTransform')
const applyAnimatedTransform = require('../../dom/applyAnimatedTransform')

module.exports = function (translation, opts) {
  // Translate the element along x and y axis.
  //
  // Parameters
  //   translation
  //     a Vector
  //   opts
  //
  if (translation.basis) {
    const proj = translation.basis.getProjectionTo(this)
    translation = vector2.project(translation, proj)
  }

  // TODO update only after possible delay?
  this.proj.x += translation.x
  this.proj.y += translation.y

  if (opts) {
    applyAnimatedTransform(this.element, this.proj, opts)
  } else {
    applyTransform(this.element, this.proj)
  }

  return this
}
