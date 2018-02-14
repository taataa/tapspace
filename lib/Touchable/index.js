/*
Touchable

Defines the public methods, API.

Notes:
[1] As a design detail, the handling of element could be located
    within Manager and hidden from Touchable. However, it is
    convenient for Touchable API users to access the element by touch.element.
[2] Mouse events do not provide info about where the drag started
    unlike touch events. Therefore we capture mouse events on
    the view container, store the target of the mousedown and
    emit our custom events to be handled by the Recognizer.
    See utils.startMouseConversion

*/
var Emitter = require('component-emitter')
var Manager = require('./Manager')
var MouseConverter = require('./MouseConverter')
var utils = require('./utils')

// See [2]
var converter = new MouseConverter()

var Touchable = function (view, item, targetItem) {
  // Make it possible to transform or press a AbstractPlane by hand.
  //
  // Parameters:
  //   view
  //     SpaceView of the HTMLElement to listen.
  //   item
  //     an AbstractPlane, the item to make touchable in the given view.
  //   targetItem
  //     optional AbstractPlane, an alternative target for detected
  //     transformations. For example, consider a drag handle that
  //     can move its larger parent.
  //
  Emitter(this)

  if (view.getContainer() === null) {
    throw new Error('Touchable requires a mounted view.')
  }

  this.view = view

  // Source item. We detect transformations from the element of this item.
  this.item = item

  if (typeof targetItem === 'undefined') {
    this.targetItem = item
  } else {
    this.targetItem = targetItem
  }

  // For pointer events (touch, mouse), we listen to the HTMLElement of
  // the given item. However, if the item is
  // the view itself, we must listen to the container element
  // of the view. This is because pointer events eventually
  // bubble to the container, instead of the view's own 0x0 div,
  // that receives only the pointer events of the children of the view.
  // See also [1] for note about code structure regarding elements.
  if (view === item) {
    this.element = this.view.getContainer()
  } else {
    this.element = this.view.getElementBySpaceItem(this.item)
  }

  // Init interaction mode.
  this.mode = Touchable.DEFAULT_MODE

  this._manager = null  // A Manager. Null means deactive state.
}

Touchable.DEFAULT_MODE = {
  rotate: false,
  scale: false,
  translate: false,
  tap: false,
  tapMaxTravel: 20,
  pivot: null,
  propagate: false
}

Touchable.prototype.start = function (mode) {
  // Set current interaction mode. It is a combination of
  // a transformation mode and a press mode.
  //
  // Parameters:
  //   mode:
  //     pivot: a tapspace.IVector
  //     propagate: bool
  //     rotate: bool
  //     scale: bool
  //     translate: bool
  //     tap: bool
  //     tapMaxTravel: number
  //
  var el, pl, v

  // Ensure mouse event conversion is running for the view. See [2].
  converter.start(this.view)

  // Reset interaction mode and then add the given mode options.
  this.mode = utils.extend(Touchable.DEFAULT_MODE, mode)

  // Create or alternatively update the manager on the fly.
  if (this._manager === null) {
    el = this.element
    pl = this.targetItem
    v = this.view
    this._manager = new Manager(el, pl, v, this, this.mode)
  } else {
    this._manager.update(this.mode)
  }
}

Touchable.prototype.restart = function (mode) {
  // Alias for start() but is more readable if recognition is really
  // "re"started.
  return this.start(mode)
}

Touchable.prototype.resume = function () {
  // Restart with the previous mode.
  if (this._manager === null) {
    this.start(this.mode)
  }
}

Touchable.prototype.stop = function () {
  // Turn touchability off
  if (this._manager !== null) {
    this._manager.destroy()
    this._manager = null

    // Ensure that mouse conversion is stopped at the last stop call.
    converter.stop(this.view)
  }
}

module.exports = Touchable
