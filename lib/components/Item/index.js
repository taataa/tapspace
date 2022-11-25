const Frame = require('../Frame')
const Interactive = require('../Interactive')

const Item = function (element) {
  // @Item(element)
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

module.exports = Item
const proto = Item.prototype

// Inherit
Object.assign(proto, Frame.prototype)
Object.assign(proto, Interactive.prototype)

// Functions
Item.create = require('./create')(Item)

// Interaction methods
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

// Methods
proto.html = require('./html')