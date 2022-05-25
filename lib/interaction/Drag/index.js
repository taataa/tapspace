const Transform = require('../../geometry/Transform')

const Drag = function (capturer, target, options) {
  // Parameters:
  //   capturer
  //     TransformCapturer
  //   target
  //     a Component
  //   options, object with properties:
  //     TODO area where to drag
  //
  if (!options) {
    options = {}
  }
  options = Object.assign({
  }, options)

  // TODO does emit?
  // emitter(this)
  // const self = this

  capturer.on('gesturemove', (ev) => {
    // Translation only
    const tr = new Transform(ev.component, 1, 0, ev.delta.x, ev.delta.y)
    target.transformBy(tr)
    // TODO limit drag area
  })
}

module.exports = Drag
