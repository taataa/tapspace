const geom = require('affineplane')

module.exports = function (tran, opts) {
  // tapspace.components.AbstractView:transformBy(tran, opts)
  //
  // Overwrites AbstractPlane:transformBy
  //
  // Transform the viewport in relation to the layers. In effect, this
  // transforms all layers with the inversion of the tran.
  //
  // Parameters:
  //   tran
  //     a Transform
  //   opts
  //     optional object with props
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

  // We have to invert the transform because of the viewport illusion.
  // The viewport does not move relative to the page.
  // Instead, the content of the viewport moves in inverted manner.
  // For example, the illusion of the viewport moving right in space
  // is achieved by moving the space left.
  const itran = geom.helm3.invert(tran)

  // Transform each layer silently.
  // Layer transitions denote transition to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.tran = geom.helm3.compose(itran, layer.tran)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update layers' CSS transform
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderTransform(opts)
  }

  return this
}
