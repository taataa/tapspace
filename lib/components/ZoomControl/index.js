const ViewportControl = require('../ViewportControl')

const ZoomControl = function (options) {
  // @ZoomControl(options)
  //
  // Inherits ViewportControl
  //
  // This control provides basic +/- buttons to zoom the viewport in and out.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       scaleStep
  //         optional number, default 1.2.
  //         The scale multiplier of single zoom step.
  //
  // Styling:
  //   affine-control-zoom
  //   affine-control-zoom-in
  //   affine-control-zoom-out
  //

  // Handle options
  if (!options) {
    options = {}
  }
  if (typeof options.scaleStep !== 'number') {
    options.scaleStep = 1.62
  }
  this.scaleStep = options.scaleStep

  // Create a new element.
  const control = document.createElement('div')
  control.className = 'affine-control-zoom'

  // Buttons
  const btnIn = document.createElement('button')
  const btnOut = document.createElement('button')

  // Class names for host-app styling
  btnIn.className = 'affine-control-zoom-in'
  btnOut.className = 'affine-control-zoom-out'

  // Labels
  btnIn.innerHTML = '+'
  btnIn.title = 'Zoom In'
  btnIn.ariaLabel = 'zoom in'
  btnOut.innerHTML = '&ndash;' // medium dash
  btnOut.title = 'Zoom Out'
  btnOut.ariaLabel = 'zoom out'

  // Sizing
  btnIn.style.width = '40px'
  btnIn.style.height = '40px'
  btnOut.style.width = '40px'
  btnOut.style.height = '40px'

  btnIn.style.fontSize = '1.4em'
  btnOut.style.fontSize = '1.4em'

  control.appendChild(btnIn)
  control.appendChild(btnOut)

  // Inherit
  ViewportControl.call(this, control)

  this.setSize({ w: 40, h: 80 })

  // Store for binding
  this.btnIn = btnIn
  this.btnOut = btnOut

  // Store handleres for unbinding
  this.onClickIn = null
  this.onClickOut = null
}

module.exports = ZoomControl
const proto = ZoomControl.prototype
proto.isZoomControl = true

// Inherit
Object.assign(proto, ViewportControl.prototype)

// Methods

proto.bind = function (viewport) {
  // @ZoomControl:bind(viewport)
  //
  // Bind button actions to the viewport.
  // In other words, this registers the viewport for the buttons.
  //
  const scaleStep = this.scaleStep

  const moveByStep = (factor) => {
    viewport.scaleBy(factor, viewport.atMid())
  }

  this.onClickIn = (ev) => {
    ev.preventDefault()
    moveByStep(1 / scaleStep)
  }

  this.onClickOut = (ev) => {
    ev.preventDefault()
    moveByStep(scaleStep)
  }

  this.btnIn.addEventListener('click', this.onClickIn)
  this.btnOut.addEventListener('click', this.onClickOut)
}

proto.unbind = function () {
  // @ZoomControl:unbind()
  // Unbind button actions
  //
  this.btnIn.removeEventListener('click', this.onClickIn)
  this.btnOut.removeEventListener('click', this.onClickOut)
  this.onClickIn = null
  this.onClickOut = null
}
