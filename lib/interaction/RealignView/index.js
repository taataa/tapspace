const RealignView = function (viewport) {
  // @tapspace.interaction.RealignView(viewport)
  //
  // Re-align the viewport on resize.
  // Keeps the viewport anchor at the same position relative to the space.
  // Pan the viewport during the resize so that the anchor stays fixed to
  // the same position in space.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Resize events will be observed form this component.
  //
  // Emits via viewport:
  //   resize
  //     with resize event object
  //

  // ASSERT valid viewport
  if (!viewport.isViewport) {
    throw new Error('Invalid viewport object')
  }

  // Emit events via viewport
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

  this.onresize = (ev) => {
    // Parameters:
    //   ev
    //     resize event object from the resize capturer.
    //

    // Anchor relative to the component size.
    const oldAnchor = this.viewport.atAnchor()
    const oldAnchorRaw = oldAnchor.getRaw() // smells
    const relAnchor = ev.previousSize.normAt(oldAnchorRaw.x, oldAnchorRaw.y)

    const newSize = ev.size.getRaw()

    // Compare it to the similar anchor point with the new size.
    const newAnchor = this.viewport.at(
      newSize.w * relAnchor.rx,
      newSize.h * relAnchor.ry
    )

    // Pan the viewport so that the center stays fixed to space.
    // Example: viewport width doubles. Without compensation,
    // the viewport center moves right by half of the original width.
    // To compensate, we should move the viewport left by the same amount.
    const counterPan = newAnchor.getVectorTo(oldAnchor)
    this.viewport.translateBy(counterPan)

    // Make viewport anchor follow the center.
    this.viewport.setAnchor(newAnchor)

    // Signal about the resize. TODO should capturer call this instead?
    this.viewport.emit('resize', ev)
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
