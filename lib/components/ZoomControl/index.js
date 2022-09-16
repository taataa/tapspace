const AbstractControl = require('../AbstractControl')

const ZoomControl = function () {
  // tapspace.components.ZoomControl()
  //
  // Basic buttons to zoom the viewport.
  //
  // Inherits tapspace.components.AbstractControl
  //

  // Create a new element.
  const element = document.createElement('div')

  // Set class name
  const className = 'affine-element affine-control'
  element.className = className

  // Set given color
  element.style.backgroundColor = 'gray'

  AbstractControl.call(this, element, {
    anchor: { x: 0, y: 0 },
    size: { w: 30, h: 60 }
  })
}

module.exports = ZoomControl
const proto = ZoomControl.prototype

// Inherit from AbstractControl
Object.assign(proto, AbstractControl.prototype)
