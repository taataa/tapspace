const Frame = require('../Frame')

const AbstractControl = function (element) {
  // tapspace.components.AbstractControl(element)
  //
  // Instance class for viewport control areas.
  //
  // Inherits Frame
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //

  // Multiple inheritance
  Frame.call(this, element)
}

module.exports = AbstractControl
// Inherit from Frame
const proto = AbstractControl.prototype
Object.assign(proto, Frame.prototype)
