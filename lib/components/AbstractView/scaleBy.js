module.exports = function (factor, opts) {
  // tapspace.components.AbstractView:scaleBy(factor, opts)
  //
  // Translate the viewport in space along x and y axis.
  //
  // Parameters
  //   factor
  //     a number
  //   opts
  //     optional object with props
  //       anchor
  //         an optional Point. Scaling is performed about this point.
  //         ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // Normalise options
  const forwardOpts = {}
  // Normalize the anchor point onto the viewport.
  forwardOpts.anchor = this.atAnchor(opts.anchor)

  // Scale each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].scaleBy(factor, forwardOpts)
  }

  return this
}
