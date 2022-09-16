const AbstractFrame = require('../AbstractFrame')

const AbstractControl = function (element, opts) {
  // tapspace.components.AbstractControl(element, opts)
  //
  // Instance class for viewport control areas.
  //
  // Inherits AbstractFrame
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //   opts
  //     anchor
  //       { x, y } on the element. Default {x:0,y:0}
  //     size
  //       { width, height }
  //

  // Multiple inheritance
  AbstractFrame.call(this, element, opts)
}

module.exports = AbstractControl
// Inherit from AbstractFrame
const proto = AbstractControl.prototype
Object.assign(proto, AbstractFrame.prototype)
