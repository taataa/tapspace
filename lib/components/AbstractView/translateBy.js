const vector2 = require('affineplane').vector2

module.exports = function (translation, opts) {
  // Translate the viewport in space along x and y axis.
  //
  // Parameters
  //   translation
  //     a Vector
  //   opts
  //
  // Return
  //   this, for chaining
  //
  if (translation.basis) {
    const proj = translation.basis.getProjectionTo(this)
    translation = vector2.project(translation, proj)
  }

  // TODO update only after possible delay?
  this.proj.x += translation.x
  this.proj.y += translation.y

  const layers = this.getChildren()

  // Translate each layer silently.
  // TODO no mutation
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.proj.x -= translation.x
    layer.proj.y -= translation.y
  }

  // Update layers' CSS transform
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderCss(opts)
  }

  return this
}
