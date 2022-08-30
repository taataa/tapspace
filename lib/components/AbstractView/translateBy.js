const geom = require('affineplane')

module.exports = function (translation, opts) {
  // tapspace.components.AbstractView:translateBy(translation, opts)
  //
  // Translate the viewport in space along x and y axis.
  //
  // Parameters
  //   translation
  //     a Vector
  //   opts
  //     optional object with props
  //       TODO
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (translation.changeBasis) {
    translation = translation.changeBasis(this)
  }

  const layers = this.getLayers()

  // Translate each layer silently.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.plane = geom.plane3.translateBy(layer.plane, translation)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update layers' CSS transform
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderTransform(opts)
  }

  return this
}
