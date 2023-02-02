const RealignView = function (viewport, options) {
  // @tapspace.interaction.RealignView(viewport, options)
  //
  // Re-align the viewport on resize.
  // Keeps the viewport anchor at the same position relative to the space.
  // Pan the viewport during the resize so that the anchor stays fixed to
  // the same position in space.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Resize events will be observed form this component.
  //   options, object with properties:
  //     relativeAnchor
  //       optional { rx, ry }. The relative point on the viewport to
  //       .. keep fixed during the resize. Default is { rx: 0.5, ry: 0.5 }
  //       .. meaning the viewport center.
  //
  // Emits via viewport:
  //   resize
  //     with resize event object
  //

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    relativeAnchor: { rx: 0.5, ry: 0.5 }
  }, options)

  // Emit events via viewport
  // TODO see if valid viewport
  this.viewport = viewport

  // Keep track of listeners to unbind them later.
  this.onresize = null

  // Track if interaction is bound. Just a safeguard to prevent duplicates.
  this.bound = false
}

module.exports = RealignView
const proto = RealignView.prototype

proto.bind = function () {
  // @tapspace.interaction.RealignView:bind()
  //
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.onresize = (ev) => {
    // Parameters:
    //   ev
    //     resize event object from the resize capturer.
    //

    // Anchor relative to the old size
    const relAnchor = this.options.relativeAnchor
    // TODO probably fails with rotated element. If so, migrate to Rect.
    const oldAnchor = ev.previousSize.atNorm(relAnchor.rx, relAnchor.ry)
    // Anchor relative to the new size
    const newAnchor = ev.size.atNorm(relAnchor.rx, relAnchor.ry)

    // Pan the viewport so that the center stays fixed to space.
    // Example: viewport width doubles. Without compensation,
    // the viewport center moves right by half of the original width.
    // To compensate, we should move the viewport left by the same amount.
    const counterPan = newAnchor.getVectorTo(oldAnchor)
    self.viewport.translateBy(counterPan)

    self.viewport.emit('resize', ev)
  }

  // Listen capturer
  const capturer = this.viewport.capturer('resize')
  capturer.on('resize', this.onresize)
}

proto.unbind = function () {
  // @tapspace.interaction.RealignView:unbind()
  //
  // Unbind listeners
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.viewport.capturer('resize')
    capturer.off('resize', this.onresize)
    this.onresize = null
  }
}
