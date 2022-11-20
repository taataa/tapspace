const AbstractFrame = require('../AbstractFrame')
const AbstractActive = require('../AbstractActive')

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
  AbstractFrame.call(this, element)
  AbstractActive.call(this)
}

module.exports = AbstractItem
// Inherit from AbstractFrame and AbstractAble
const proto = AbstractItem.prototype
Object.assign(proto, AbstractFrame.prototype)
Object.assign(proto, AbstractActive.prototype)

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
