const AbstractFrame = require('../AbstractFrame')

const AbstractControl = function (element) {
  // tapspace.components.AbstractControl(element)
  //
  // Instance class for viewport control areas.
  //
  // Inherits AbstractFrame
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //

  // Multiple inheritance
  AbstractFrame.call(this, element)
}

module.exports = AbstractControl
// Inherit from AbstractFrame
const proto = AbstractControl.prototype
Object.assign(proto, AbstractFrame.prototype)
