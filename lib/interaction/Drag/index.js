const plane3 = require('affineplane').plane3

const Drag = function (source, target, options) {
  // tapspace.interaction.Drag(source, target, options)
  //
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

  // Normalise this.source
  if (source.affine) {
    this.source = source.affine
  } else if (source.tran) {
    this.source = source
  } else {
    throw new Error('You cannot drag from a non-affine element.')
  }

  // Normalise this.target
  if (target.affine) {
    this.target = target.affine
  } else if (target.tran) {
    this.target = target
  } else {
    throw new Error('You cannot drag a non-affine element.')
  }

  // Normalise options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    minTravel: 0,
    maxTravel: Infinity
  }, options)

  // Keep track of initial position of the gesture so that
  // the gesture can be cancelled.
  this.initialTran = null

  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false

  // TODO does emit?
  // emitter(this)
  // const self = this
}

Drag.prototype.bind = function () {
  // tapspace.interaction.Drag:bind()
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  const self = this

  this.ongesturestart = (ev) => {
    // Remember initial position for drag cancellation.
    self.initialTran = plane3.copy(self.target.tran)
    self.target.emit('dragstart', ev)
  }

  this.ongesturemove = (ev) => {
    self.target.translateBy(ev.delta)
    // TODO limit travel
    self.target.emit('dragmove', ev)
    self.target.emit('drag', ev) // TODO needed?
  }

  this.ongestureend = (ev) => {
    self.target.emit('dragend', ev)
  }

  this.ongesturecancel = (ev) => {
    // Return the target to the original position
    self.target.tran = self.initialTran
    self.initialTran = null
    self.target.renderTransform()
    self.target.emit('dragcancel', ev)
  }

  const capturer = this.source.capturer('gesture')
  capturer.on('gesturestart', this.ongesturestart)
  capturer.on('gesturemove', this.ongesturemove)
  capturer.on('gestureend', this.ongestureend)
  capturer.on('gesturecancel', this.ongesturecancel)
}

Drag.prototype.setSource = function (comp) {
  // tapspace.interaction.Drag:setSource(comp)
  //
  // Set input source component.
  // Rebinds if the drag was bound.
  //
  let wasBound = false

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
  // tapspace.interaction.Drag:setTarget(comp)
  //
  // Set output target component
  //
  let wasBound = false

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
  // tapspace.interaction.Drag:unbind()
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.source.capturer('gesture')
    capturer.off('gesturestart', this.ongesturestart)
    capturer.off('gesturemove', this.ongesturemove)
    capturer.off('gestureend', this.ongestureend)
    capturer.off('gesturecancel', this.ongesturecancel)
    this.ongesturestart = null
    this.ongesturemove = null
    this.ongestureend = null
    this.ongesturecancel = null
  }
}

module.exports = Drag
