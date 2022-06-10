const AbstractAble = function (opts) {
  // Interaction methods for affine components.
  // Designed to be inherited by instance class that
  // inherit from AbstractPlane.
  //
  // Parameters:
  //   opts
  //

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

const proto = AbstractAble.prototype
module.exports = AbstractAble

proto.capturer = require('./capturer')
proto.draggable = require('./draggable')
proto.pannable = proto.draggable
proto.resizable = require('./resizable')
proto.slidable = require('./slidable')
proto.slideable = proto.slidable
proto.tappable = require('./tappable')
