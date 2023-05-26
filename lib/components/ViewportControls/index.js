const Component = require('../Component')

const ViewportControls = function () {
  // @ViewportControls()
  //
  // Inherits Component
  //
  // A container for viewport controls.
  // Designed to be used internally by Viewport.
  // Cannot be moved.
  //
  const elem = document.createElement('div')
  elem.className = 'affine-controls'

  // Use default anchor 0,0
  Component.call(this, elem)
}

const proto = ViewportControls.prototype
module.exports = ViewportControls
proto.isViewportControls = true

// Inherit
Object.assign(proto, Component.prototype)
