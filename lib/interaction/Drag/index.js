const Transform = require('../../geometry/Transform')
const affineplane = require('affineplane')
const proj2 = affineplane.proj2
const tran2 = affineplane.tran2

const Drag = function (capturer, target, options) {
  // Drag interaction. Move the target element around.
  //
  // Parameters:
  //   capturer
  //     TransformCapturer
  //   target
  //     HTMLElement
  //   options, object with properties:
  //     minTravel
  //     maxTravel
  //
  if (!options) {
    options = {}
  }
  options = Object.assign({
    minTravel: 0,
    maxTravel: Infinity
  }, options)

  if (!target.affine) {
    throw new Error('You cannot interact with non-affine elements.')
  }

  this.initialProj = proj2.clone(target.affine.proj)

  // TODO does emit?
  // emitter(this)
  // const self = this

  capturer.on('gesturestart', (ev) => {
    // Remember initial position
    this.initialProj = proj2.clone(target.affine.proj)
  })
  capturer.on('gesturemove', (ev) => {
    const vec = tran2.getTranslation(ev.delta)
    const tl = new Vector(ev.element, ev.delta)
    target.affine.translateBy(tl)
    // TODO limit travel
  })
  capturer.on('gesturecancel', (ev) => {
    // Return the target to the original position
    target.affine.proj = this.initialProj
    target.affine.renderCss()
  })
}

module.exports = Drag
