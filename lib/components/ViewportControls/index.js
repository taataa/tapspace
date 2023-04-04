const BasisElement = require('../BasisElement')

const ViewportControls = function () {
  // @ViewportControls()
  //
  // Inherits BasisElement
  //
  // A container for viewport controls.
  // Designed to be used internally by Viewport.
  // Cannot be moved.
  //
  const elem = document.createElement('div')
  elem.className = 'affine-controls'

  // Use default anchor 0,0
  BasisElement.call(this, elem)
}

const proto = ViewportControls.prototype
module.exports = ViewportControls
proto.isViewportControls = true

// Inherit
Object.assign(proto, BasisElement.prototype)
