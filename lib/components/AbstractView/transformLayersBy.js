const geom = require('affineplane')

module.exports = function (tran, opts) {
  // tapspace.components.AbstractView:transformLayersBy(tran, opts)
  //
  // Transform the layers in relation to the viewport. In effect, this
  // transforms all layers with the tran. Use this to navigate the space.
  //
  // Parameters:
  //   tran
  //     a Transform
  //   opts
  //     optional object with props:
  //       silent event options TODO
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view
  if (tran.basis) {
    const plane = tran.basis.getTransitionTo(this)
    tran = geom.helm3.transitFrom(tran, plane)
  }

  const layers = this.getLayers()

  // Transform each layer silently.
  // Layer transitions contain transition to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.tran = geom.plane3.transform(layer.tran, tran)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update layers' CSS transform
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderTransform(opts)
  }

  return this
}
