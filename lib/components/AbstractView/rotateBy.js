module.exports = function (angle, opts) {
  // Rotate the viewport in space around anchor.
  //
  // Parameters
  //   angle
  //     a number, the delta angle to rotate the viewport.
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

  // Normalise options
  const forwardOpts = {}
  // Normalize the anchor point onto the viewport.
  forwardOpts.anchor = this.atAnchor(opts.anchor)

  // Rotate each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].rotateBy(angle, forwardOpts)
  }

  return this
}
