const Frame = require('../Frame')

const Control = function (element) {
  // tapspace.components.Control(element)
  //
  // Base class for viewport control areas.
  //
  // Inherits Frame
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //

  // Inherit
  Frame.call(this, element)

  // Set class name
  element.classList.add('affine-control')
}

module.exports = Control
const proto = Control.prototype

// Inherit
Object.assign(proto, Frame.prototype)
