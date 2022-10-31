
const Pinch = function (capturer, target, options) {
  // tapspace.interaction.Pinch(capturer, target, options)
  //
  // Parameters:
  //   capturer
  //     GestureCapturer
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
    target.affine.transformBy(ev.delta)
    // TODO limit element scale
  })
}

module.exports = Pinch
