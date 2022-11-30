// Use mouse wheel deltaX for rotation.
//

const WheelRotate = function (viewport, options) {
  // tapspace.interaction.WheelRotate(viewport, options)
  //
  // Wheel rotate interaction for viewports.
  // Rotate the origin planes by mouse wheel left-right axis.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Get input form this component.
  //   options, object with properties:
  //     pivot
  //       optional Point. Defaults to the mouse cursor position.
  //       .. The rotation is performed around this fixed point.
  //

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    pivot: null
  }, options)

  // Emit events via viewport
  // TODO see if valid viewport
  this.viewport = viewport

  // Keep track of listeners for unbind
  this.onwheel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
}

module.exports = WheelRotate
const proto = WheelRotate.prototype

proto.bind = function () {
  // tapspace.interaction.WheelRotate:bind()
  //
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.onwheel = (ev) => {
    const deltaAngle = ev.deltaX / 200

    // Normalise pivot
    let pivot = this.options.pivot
    if (!pivot) {
      pivot = ev.center
    }

    self.viewport.rotateBy(deltaAngle, pivot)

    // Snap to pixel grid for pixel-perfect gesture.
    self.viewport.snapPixels(pivot)

    // TODO limit rotation

    self.viewport.emit('wheel', ev)
  }

  // Listen capturer
  const capturer = this.viewport.capturer('wheel')
  capturer.on('wheel', this.onwheel)
}

proto.unbind = function () {
  // tapspace.interaction.WheelRotate:unbind()
  //
  // Unbind listeners
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.viewport.capturer('wheel')
    capturer.off('wheel', this.onwheel)
    this.onwheel = null
  }
}
