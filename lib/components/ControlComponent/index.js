const FrameComponent = require('../FrameComponent')

const ControlComponent = function (element) {
  // @ControlComponent(element)
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

module.exports = ControlComponent
const proto = ControlComponent.prototype
proto.isControlComponent = true

// Inherit
Object.assign(proto, FrameComponent.prototype)
