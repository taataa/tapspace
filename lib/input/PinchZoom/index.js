const emitter = require('component-emitter')
const Transform = require('../../Transform')

const PinchZoom = function (capturer, target, options) {
  // Parameters:
  //   capturer
  //     TransformCapturer
  //   target
  //     HTMLElement
  //   options, object with properties:
  //     minScale
  //     maxScale
  //
  if (!options) {
    options = {}
  }
  options = Object.assign({
    minScale: 0,
    maxScale: Infinity
  }, options)

  emitter(this)
  const self = this

  capturer.on('gesturemove', (ev) => {
    const tr = new Transform(ev.element, ev.delta)
    target.affine.transformBy(tr)
    // TODO limit element scale
  })
}

module.exports = TapGesture
