const AbstractControl = require('../AbstractControl')

const ZoomControl = function () {
  // tapspace.components.ZoomControl()
  //
  // Basic buttons to zoom the viewport.
  //
  // Inherits tapspace.components.AbstractControl
  //

  // Create a new element.
  const control = document.createElement('div')

  // Set class name
  const className = 'affine-element affine-control'
  control.className = className

  // Set given color
  control.style.backgroundColor = 'gray'

  // Buttons
  const btnIn = document.createElement('button')
  const btnOut = document.createElement('button')

  // Labels
  btnIn.innerHTML = '+'
  btnIn.title = 'Zoom In'
  btnOut.innerHTML = '&ndash;' // medium dash
  btnOut.title = 'Zoom Out'

  // Sizing
  btnIn.style.width = '40px'
  btnIn.style.height = '40px'
  btnOut.style.width = '40px'
  btnOut.style.height = '40px'

  btnIn.style.fontSize = '1.4em'
  btnOut.style.fontSize = '1.4em'

  control.appendChild(btnIn)
  control.appendChild(btnOut)

  AbstractControl.call(this, control, {
    anchor: { x: 0, y: 0 },
    size: { w: 40, h: 80 }
  })

  // Store for binding
  this.btnIn = btnIn
  this.btnOut = btnOut

  // Store handleres for unbinding
  this.onClickIn = null
  this.onClickOut = null
}

module.exports = ZoomControl
const proto = ZoomControl.prototype

// Inherit from AbstractControl
Object.assign(proto, AbstractControl.prototype)

// Methods

proto.bind = function (viewport) {
  // Bind button actions to the viewport.
  // In other words, this registers the viewport for the buttons.
  const factor = 1.2

  this.onClickIn = (ev) => {
    ev.preventDefault()
    viewport.scaleBy(factor, viewport.atMid())
  }

  this.onClickOut = (ev) => {
    ev.preventDefault()
    viewport.scaleBy(1 / factor, viewport.atMid())
  }

  this.btnIn.addEventListener('click', this.onClickIn)
  this.btnOut.addEventListener('click', this.onClickOut)
}

proto.unbind = function () {
  // Unbind button actions
  //
  this.btnIn.removeEventListener('click', this.onClickIn)
  this.btnOut.removeEventListener('click', this.onClickOut)
  this.onClickIn = null
  this.onClickOut = null
}
