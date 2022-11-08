const RealignView = function (viewport, options) {
  // tapspace.interaction.RealignView(viewport, options)
  //
  // Re-align the viewport on resize.
  // Keeps the viewport center at the same position relative to the space.
  // Pan the viewport during the resize so that the center stays fixed to
  // the same space point.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Resize events will be observed form this component.
  //   options, object with properties:
  //     relativeCenter
  //       optional { rx, ry }. The relative point on the viewport to
  //       .. keep fixed during the resize.
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
    relativeCenter: { rx: 0.5, ry: 0.5 }
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
  // tapspace.interaction.RealignView:bind()
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

    // Center relative to the old size
    const relCenter = this.options.relativeCenter
    // TODO probably fails with rotated element. If so, migrate to Rect.
    const oldCenter = ev.prevSize.atNorm(relCenter.rx, relCenter.ry)
    // Center relative to the new size
    const newCenter = ev.size.atNorm(relCenter.rx, relCenter.ry)

    // Pan the viewport so that the center stays fixed to space.
    // Example: viewport width doubles. Without compensation,
    // the viewport center moves right by half of the original width.
    // To compensate, we should move the viewport left by the same amount.
    const counterPan = newCenter.getVectorTo(oldCenter)
    self.viewport.translateBy(counterPan)

    self.viewport.emit('resize', ev)
  }

  // Listen capturer
  const capturer = this.viewport.capturer('resize')
  capturer.on('resize', this.onresize)
}

proto.unbind = function () {
  // tapspace.interaction.RealignView:unbind()
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
