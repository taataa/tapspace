const geom = require('affineplane')

// Overwrite AbstractPlane:transformBy
module.exports = function (tran, opts) {
  // Transform the viewport in relation to the layers. In effect, this
  // transforms all layers with the inversion of the tran.
  //
  // Parameters:
  //   tran
  //     a Transform
  //   opts
  //     animation options TODO
  //     silent event options TODO
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

  // We have to invert the transform because of the viewport illusion.
  // The viewport does not move relative to the page.
  // Instead, the content of the viewport moves in inverted manner.
  // For example, the illusion of the viewport moving right in space
  // is achieved by moving the space left.
  const itran = geom.tran2.invert(tran)

  // Transform each layer silently.
  // Layer projections denote projection to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.proj = geom.tran2.compose(itran, layer.proj)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update layers' CSS transform
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderCss(opts)
  }

  return this
}
