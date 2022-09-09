module.exports = function (angle, opts) {
  // tapspace.components.AbstractView:rotateBy(angle, opts)
  //
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

  // Rotate each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].rotateBy(angle, forwardOpts)
  }

  return this
}
