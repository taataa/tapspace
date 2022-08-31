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

  // Scale each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].scaleBy(factor, forwardOpts)
  }

  return this
}
