//
// Recognizer
//
// Handles integration to Tapspace and how gestures are recognized.
//
var Transform = require('../geom/Transform')
var ITransform = require('../geom/ITransform')
var Vector = require('../geom/Vector')
var IVector = require('../geom/IVector')

var Recognizer = function (element, item, view, emitter, mode) {
  // Create a Recognizer
  //   var man = new Recognizer(...)
  //
  // Parameters:
  //   element
  //     HTML element to listen to
  //   item
  //     a tapspace.AbstractPlane, the object to move
  //   view
  //     a tapspace.SpaceView
  //   emitter
  //     public emitter the user listens to
  //   mode
  //     a transformation type
  //
  var self = this

  this.element = element
  this.item = item
  this.view = view
  this.mode = mode

  var onWheel = function (ev) {
    ev.preventDefault()

    var tr, itr, pivot, ipivot

    // Available event properties
    // ev.pageX
    // ev.pageY
    // ev.deltaX
    // ev.deltaY
    // ev.deltaZ for 3D-mouses

    if (self.mode.translate) {
      tr = new Transform(1, 0, ev.deltaX, ev.deltaY)
      itr = new ITransform(tr, self.view)
    } else if (self.mode.scale) {
      pivot = new Vector(ev.pageX, ev.pageY)
      ipivot = new IVector(pivot, self.view)
      itr = ITransform.IDENTITY.scale(ipivot, 1 + ev.deltaY / 1000)
    } else if (self.mode.rotate) {
      pivot = new Vector(ev.pageX, ev.pageY)
      ipivot = new IVector(pivot, self.view)
      itr = ITransform.IDENTITY.rotate(ipivot, ev.deltaY / 1000)
    }

    if (view === item) {
      self.view.transformBy(itr)
    } else {
      self.item.transformBy(itr.inverse())
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
