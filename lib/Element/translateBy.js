module.exports = function (translation, opts) {
  if (translation.element) {
    translation = changeBasis(translation, translation.element, this)
  }

  // TODO update only after possible delay?
  this.tr.x += translation.x
  this.tr.y += translation.y

  if (opts) {
    setAnimatedElementTransform(this.el, this.tr, opts)
  } else {
    setElementTransform(this.el, this.tr)
  }

  return this
}
