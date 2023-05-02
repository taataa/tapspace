const FrameComponent = require('../FrameComponent')
const InteractiveComponent = require('../InteractiveComponent')

const Item = function (element) {
  // @Item(element)
  //
  // Inherits FrameComponent and InteractiveComponent
  //
  // Item is an instance class for interactive material items in affine space.
  // The items can have abilities like slidable, tappable, or draggable.
  //
  // Parameters:
  //   element
  //     an HTMLElement. The element does not need to be in DOM.
  //

  // Multiple inheritance
  FrameComponent.call(this, element)
  InteractiveComponent.call(this)

  // Add class
  element.classList.add('affine-item')

  // Override default mass
  this.mass = Infinity
}

module.exports = Item
const proto = Item.prototype
proto.isItem = true

// Inherit
Object.assign(proto, FrameComponent.prototype)
Object.assign(proto, InteractiveComponent.prototype)

// Functions
Item.create = require('./create')(Item)

// Overriding methods
proto.focus = require('./focus')

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
