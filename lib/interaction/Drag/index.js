const affineplane = require('affineplane')
const proj2 = affineplane.proj2
const tran2 = affineplane.tran2
const Vector = require('../../geometry/Vector')

const Drag = function (source, target, options) {
  // Drag interaction. Move the target element around.
  //
  // Parameters:
  //   source
  //     a Component. Get drag input form this component.
  //   target
  //     a Component. Apply effect to this component.
  //     To make the component draggable, use source as the target.
  //     To build a handle, target a parent of the source.
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
  this.source = source
  this.target = target

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

  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // TODO does emit?
  // emitter(this)
  // const self = this
}

Drag.prototype.bind = function () {
  const self = this

  if (!this.target.affine) {
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

  const capturer = this.source.capturer('gesture')
  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gesturemove', this.ongesturemove)
  capturer.on('gesturecancel', this.ongesturecancel)
}

Drag.prototype.setSource = function (comp) {
  // Set input source component
  //
  const wasBound = false

  if (this.bound) {
    wasBound = true
    this.unbind()
  }

  this.source = comp

  if (wasBound) {
    this.bind()
  }
}

Drag.prototype.setTarget = function (comp) {
  // Set output target component
  //
  const wasBound = false

  if (this.bound) {
    wasBound = true
    this.unbind()
  }

  this.target = comp

  if (wasBound) {
    this.bind()
  }
}

Drag.prototype.unbind = function () {
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.source.capturer('gesture')
    capturer.off('gesturestart', this.ongesturestart)
    capturer.off('gesturemove', this.ongesturemove)
    capturer.off('gesturecancel', this.ongesturecancel)
    this.ongesturestart = null
    this.ongesturemove = null
    this.ongesturecancel = null
  }
}

module.exports = Drag
