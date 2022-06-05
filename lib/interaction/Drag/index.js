const affineplane = require('affineplane')
const proj2 = affineplane.proj2
const tran2 = affineplane.tran2
const Vector = require('../../geometry/Vector')

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
  this.options = Object.assign({
    minTravel: 0,
    maxTravel: Infinity
  }, options)

  // Keep track of initial position of the gesture so that
  // the gesture can be cancelled.
  this.initialProj = null

  // TODO does emit?
  // emitter(this)
  // const self = this
}

Drag.prototype.bind = function (capturer, target) {
  const self = this

  if (!target.affine) {
    throw new Error('You cannot interact with non-affine elements.')
  }

  this.ongesturestart = (ev) => {
    // Remember initial position for drag cancellation.
    self.initialProj = proj2.clone(target.affine.proj)
  }

  this.ongesturemove = (ev) => {
    const vec = tran2.getTranslation(ev.delta)
    const tl = new Vector(ev.element, vec)
    target.affine.translateBy(tl)
    // TODO limit travel
  }

  this.ongesturecancel = (ev) => {
    // Return the target to the original position
    target.affine.proj = self.initialProj
    self.initialProj = null
    target.affine.renderCss()
  }

  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gesturemove', this.ongesturemove)
  capturer.on('gesturecancel', this.ongesturecancel)
}

Drag.prototype.unbind = function () {
  // Unbind the capturer. How to collect the events.
  capturer.off('gesturestart', this.ongesturestart)
  capturer.off('gesturemove', this.ongesturemove)
  capturer.off('gesturecancel', this.ongesturecancel)
}

module.exports = Drag
