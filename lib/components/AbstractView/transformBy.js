const geom = require('affineplane')

// Overwrite AbstractPlane:transformBy
module.exports = function (tran, opts) {
  // Transforms all layers with the inversion of the tran.
  //
  // Parameters:
  //   tran
  //     a Transform
  //   opts
  //     animation options TODO
  //     silent event options TODO
  //

  // Normalize
  if (tran.basis) {
    const pr = tran.basis.getProjectionTo(this)
    tran = geom.proj2.tran2(pr, tran)
  }

  const layers = this.getChildren()

  // Invert the transform because we are the viewport
  const itran = geom.tran2.invert(tran)

  // Transform each layer silently.
  // Layer projections denote projection to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    layer.proj = proj2.compose(itran, layer.proj)
  }

  // TODO update layers' CSS transform
}
