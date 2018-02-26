//
// Recognizer
//
// Handles integration to Tapspace and how gestures are recognized.
//
var Transform = require('../geom/Transform')
var ITransform = require('../geom/ITransform')
var Vector = require('../geom/Vector')
var IVector = require('../geom/IVector')

var Recognizer = function (element, target, view, emitter, mode) {
  // Create a Recognizer
  //   var man = new Recognizer(...)
  //
  // Parameters:
  //   element
  //     HTML element to listen to
  //   target
  //     a tapspace.AbstractPlane or function, the object to move
  //     or a function to call.
  //   view
  //     a tapspace.SpaceView
  //   emitter
  //     public emitter the user listens to
  //   mode
  //     a transformation type
  //
  var self = this

  this.element = element
  this.target = target
  this.view = view
  this.mode = mode

  var onWheel = function (ev) {
    ev.preventDefault()

    var tr, itr, pivot, x, y, dx, dy, dz

    // Available event properties
    // ev.pageX
    // ev.pageY
    // ev.deltaX
    // ev.deltaY
    // ev.deltaZ for 3D-mouses
    x = ev.pageX
    y = ev.pageY
    dx = ev.deltaX
    dy = ev.deltaY
    dz = ev.deltaZ

    itr = ITransform.IDENTITY

    if (self.mode.translate) {
      if (self.mode.scale) {
        pivot = new IVector(new Vector(x, y), self.view)
        itr = itr
          .scale(pivot, 1 + dy / 1000)
          .translate(self.view.at(0, 0), self.view.at(dx, 0))
      } else {
        tr = new Transform(1, 0, dx, dy)
        itr = new ITransform(tr, self.view)
      }
    } else if (self.mode.scale) {
      pivot = new IVector(new Vector(x, y), self.view)
      itr = itr.scale(pivot, 1 + dy / 1000)
    }

    if (self.mode.rotate) {
      pivot = new IVector(new Vector(x, y), self.view)
      itr = itr.rotate(pivot, dz / 1000)
    }

    if (self.view === self.target) {
      self.view.transformBy(itr)
    } else if (typeof self.target === 'function') {
      self.target(itr.inverse())
    } else {
      self.target.transformBy(itr.inverse())
    }
  }

  this.element.addEventListener('wheel', onWheel)
  this.listener = onWheel
}

Recognizer.prototype.update = function (mode) {
  this.mode = mode
}

Recognizer.prototype.destroy = function () {
  this.element.removeEventListener('wheel', this.listener)
}

module.exports = Recognizer
