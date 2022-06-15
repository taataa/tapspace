// Use mouse wheel deltaX for rotation.
//

const WheelRotate = function (viewport, options) {
  // Wheel rotate interaction for viewports.
  // Rotate the viewport layers by mouse wheel left-right axis.
  //
  // Parameters:
  //   viewport
  //     a Viewport. Get input form this component.
  //   options, object with properties:
  //     center
  //       a Point. The center point for the rotation.
  //       ..TODO Defaults to the cursor position.
  //

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    center: null
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
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.onwheel = (ev) => {
    const deltaAngle = ev.deltaX / 20
    self.viewport.rotateBy(deltaAngle, {
      anchor: ev.center
    })
    // TODO limit rotation
    self.viewport.emit('wheel', ev)
  }

  // Listen capturer
  const capturer = this.viewport.capturer('wheel')
  capturer.on('wheel', this.onwheel)
}

proto.unbind = function () {
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