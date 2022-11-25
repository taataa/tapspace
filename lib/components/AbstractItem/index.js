const Frame = require('../Frame')
const Interactive = require('../Interactive')

const AbstractItem = function (element) {
  // tapspace.components.AbstractItem(element)
  //
  // Instance class for interactive material items on affine plane.
  // The items can have abilities like slidable, tappable, or draggable.
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //

  // Multiple inheritance
  Frame.call(this, element)
  Interactive.call(this)
}

module.exports = AbstractItem
// Inherit from Frame and Active
const proto = AbstractItem.prototype
Object.assign(proto, Frame.prototype)
Object.assign(proto, Interactive.prototype)

proto.dilatable = require('./scalable')
proto.draggable = require('./draggable')
proto.holdable = require('./holdable')
proto.pannable = proto.draggable
proto.translatable = proto.draggable
proto.resizable = require('./resizable')
proto.rotatable = require('./rotatable')
proto.rotateable = proto.rotatable
proto.scalable = proto.dilatable
proto.slidable = require('./slidable')
proto.slideable = proto.slidable
proto.tappable = require('./tappable')
