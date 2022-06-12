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

  // Normalize
  if (translation.basis) {
    const proj = translation.basis.getProjectionTo(this)
    translation = vector2.project(translation, proj)
  }

  const layers = this.getLayers()

  // Translate each layer silently.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.proj = {
      a: layer.proj.a,
      b: layer.proj.b,
      x: layer.proj.x - translation.x,
      y: layer.proj.y - translation.y
    }
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update layers' CSS transform
  const renderOpts = { snapPixels: true }
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderCss(renderOpts)
  }

  return this
}
