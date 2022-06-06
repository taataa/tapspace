// Abstract interactive item.
// Is an AbstractPlane.
// Provides methods for interaction.
//

const AbstractPlane = require('../AbstractPlane')

const AbstractAble = function (element, opts) {
  // Abstract class for rectangular affine components
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //   opts
  //     anchor
  //       { x, y } on the element. Optional. Default {x:0, y:0}
  //

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }

  // Inherit from AbstractPlane
  AbstractPlane.call(this, element, opts)

  // Default params
  opts = Object.assign({
    // size: { width: 256, height: 256 }
  }, opts)

  // Init capturers object.
  this.capturers = {
    // gesture
    // wheel
    // keyboard
  }

  // Init interactions object.
  // The object effectively limits one interaction for each interaction type.
  this.interactions = {}
}

// Inherit from AbstractPlane
const proto = Object.assign({}, AbstractPlane.prototype)
AbstractAble.prototype = proto
module.exports = AbstractAble

proto.capturer = require('./capturer')
proto.draggable = require('./draggable')
proto.resizable = require('./resizable')
proto.slidable = require('./slidable')
proto.slideable = proto.slidable
proto.tappable = require('./tappable')
