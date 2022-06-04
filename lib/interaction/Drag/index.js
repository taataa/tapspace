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
  //       optional distance. The minimum required distance for
  //       .. the drag to begin.
  //     maxTravel
  //       optional distance. The maximum allowed distance for
  //       .. the element to move during the gesture.
  //
  // TODO maxDistance
  // TODO minDistance
  // TODO minDuration
  // TODO maxDuration
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


  // Keep track of initial position of the gesture.
  this.initialProj = null

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
    this.initialProj = null
    target.affine.renderCss()
  })
}

Drag.prototype.destroy = function () {
  // Unbind the capturer. How to collect the events.
}

module.exports = Drag
