const geom = require('affineplane')

module.exports = function (tran, opts) {
  // Transform the layers in relation to the viewport. In effect, this
  // transforms all layers with the tran. Use this to navigate the space.
  //
  // Parameters:
  //   tran
  //     a Transform
  //   opts
  //     optional object with props:
  //       animation options TODO
  //       silent event options TODO
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view
  if (tran.basis) {
    const pr = tran.basis.getProjectionTo(this)
    tran = geom.proj2.tran2(pr, tran)
  }

  const layers = this.getLayers()

  // Transform each layer silently.
  // Layer projections contain projection to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.proj = geom.tran2.compose(tran, layer.proj)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update layers' CSS transform
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderCss(opts)
  }

  return this
}
