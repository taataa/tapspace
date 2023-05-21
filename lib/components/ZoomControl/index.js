const ControlComponent = require('../ControlComponent')

const ZoomControl = function (options) {
  // @ZoomControl(options)
  //
  // Inherits ControlComponent
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

  // Set given color
  control.style.backgroundColor = 'gray'

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
  ControlComponent.call(this, control)

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
Object.assign(proto, ControlComponent.prototype)

// Methods

proto.bind = function (viewport) {
  // @ZoomControl:bind(viewport)
  //
  // Bind button actions to the viewport.
  // In other words, this registers the viewport for the buttons.
  //
  const scaleStep = this.scaleStep

  const moveByStep = (factor) => {
    if (viewport.proj === '2d') {
      viewport.scaleBy(factor, viewport.atMid())
    } else if (viewport.proj === '3d') {
      // Move camera forward instead of scaling.
      // Find element at the middle.
      const camera = viewport.atCamera()
      const targetItem = viewport.getItemAt(viewport.atMid())
      const targetPoint = viewport.atMid().projectTo(targetItem, camera)
      viewport.translateTowards(factor, targetPoint)
      // DEBUG
      // const dv = viewport.atMid().getVectorTo(target.atAnchor())
      // console.log('distance to target', dv)
    }
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
