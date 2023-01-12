const Frame = require('../Frame')
const Interactive = require('../Interactive')

const Item = function (element) {
  // @Item(element)
  //
  // Inherits Frame and Interactive
  //
  // Item is an instance class for interactive material items in affine space.
  // The items can have abilities like slidable, tappable, or draggable.
  //
  // Parameters:
  //   element
  //     an HTMLElement. The element does not need to be in DOM.
  //

  // Multiple inheritance
  Frame.call(this, element)
  Interactive.call(this)

  // Add class
  element.classList.add('affine-item')
}

module.exports = Item
const proto = Item.prototype

// Inherit
Object.assign(proto, Frame.prototype)
Object.assign(proto, Interactive.prototype)

// Functions
Item.create = require('./create')(Item)

// Interaction methods
proto.approachable = require('./approachable')
proto.dilatable = require('./scalable')
proto.disable = require('./disable')
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
