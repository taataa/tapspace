const FrameComponent = require('../FrameComponent')

const Control = function (element) {
  // @Control(element)
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

module.exports = Control
const proto = Control.prototype
proto.isControl = true

// Inherit
Object.assign(proto, FrameComponent.prototype)
