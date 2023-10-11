const FrameComponent = require('../FrameComponent')

const ViewportControl = function (element) {
  // @ViewportControl(element)
  //
  // Inherits FrameComponent
  //
  // Base class for viewport control areas.
  //
  // Parameters:
  //   element
  //     an HTMLElement. The element does not need to be in DOM.
  //

  // Inherit
  FrameComponent.call(this, element)

  // Set class name
  element.classList.add('affine-control')
}

module.exports = ViewportControl
const proto = ViewportControl.prototype
proto.isViewportControl = true

// Inherit
Object.assign(proto, FrameComponent.prototype)
