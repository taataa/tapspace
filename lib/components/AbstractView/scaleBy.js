module.exports = function (factor, opts) {
  // Translate the viewport in space along x and y axis.
  //
  // Parameters
  //   factor
  //     a number
  //   opts
  //     anchor
  //       an optional Point. Scaling is performed about this point.
  //       ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // Normalize the anchor point onto the viewport.
  const center = this.atAnchor(opts.anchor)

  // Scale each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].scaleBy(factor, { anchor: center })
  }

  return this
}
