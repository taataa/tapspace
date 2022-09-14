const Transform = require('../../geometry/Transform')

const Pinch = function (capturer, target, options) {
  // tapspace.interaction.Pinch(capturer, target, options)
  //
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

  // TODO does emit?
  // emitter(this)
  // const self = this
  //

  capturer.on('gesturemove', (ev) => {
    const tr = new Transform(ev.element, ev.delta)
    target.affine.transformBy(tr)
    // TODO limit element scale
  })
}

module.exports = Pinch
