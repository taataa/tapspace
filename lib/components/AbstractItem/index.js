const AbstractFrame = require('../AbstractFrame')
const AbstractActive = require('../AbstractActive')

const AbstractItem = function (element, opts) {
  // Instance class for interactive material items on affine plane.
  // The items can have abilities like slidable, tappable, or draggable.
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //   opts
  //     anchor
  //       { x, y } on the element. Default {x:0,y:0}
  //     size
  //       { width, height }
  //

  // Multiple inheritance
  AbstractFrame.call(this, element, opts)
  AbstractActive.call(this)
}

module.exports = AbstractItem
// Inherit from AbstractFrame and AbstractAble
const proto = AbstractItem.prototype
Object.assign(proto, AbstractFrame.prototype)
Object.assign(proto, AbstractActive.prototype)

proto.draggable = require('./draggable')
proto.pannable = proto.draggable
proto.resizable = require('./resizable')
proto.slidable = require('./slidable')
proto.slideable = proto.slidable
proto.tappable = require('./tappable')
