const ResizeAlign = function (viewport, options) {
  // Re-align viewport on resize.
  // Keeps the viewport center relatively at the same position.
  // Pan the viewport during the resize so that the center stays fixed to
  // the same space point.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Observe resize events form this component.
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

  // Keep track of listeners for unbind
  this.onresize = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
}

module.exports = ResizeAlign
const proto = ResizeAlign.prototype

proto.bind = function () {
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
    const oldCenter = ev.prevSize.atNorm(relCenter.rx, relCenter.ry)
    // Center relative to the new size
    const newCenter = ev.size.atNorm(relCenter.rx, relCenter.ry)

    // Pan the viewport so that the center stays fixed to space.
    const counterPan = newCenter.vectorTo(oldCenter)
    self.viewport.translateBy(counterPan)

    self.viewport.emit('resize', ev)
  }

  // Listen capturer
  const capturer = this.viewport.capturer('resize')
  capturer.on('resize', this.onresize)
}

proto.unbind = function () {
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
