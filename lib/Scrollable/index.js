//
// Scrollable
//
// Map mouse wheel input to transformations in space.
//
var Emitter = require('component-emitter')
var Manager = require('./Manager')
var utils = require('../Touchable/utils')

var Scrollable = function (view, item) {
  // Parameters
  //   view
  //     SpaceView of the HTMLElement to listen.
  //   item
  //     We detect mouse wheel events from the element of this item.
  //
  Emitter(this)

  if (view.getContainer() === null) {
    throw new Error('Scrollable requires a mounted view.')
  }

  this.view = view
  this.item = item

  if (view === item) {
    this.element = this.view.getContainer()
  } else {
    this.element = this.view.getElementBySpaceItem(this.item)

    // Ensure the element exists
    if (this.element === null) {
      throw new Error('No HTMLElement found for the item. ' +
        'Ensure the item is in the same space with the view.')
    }
  }

  // Init interaction mode.
  this.mode = Scrollable.DEFAULT_MODE

  this._manager = null // A Manager. Null means deactive state.
}

Scrollable.DEFAULT_MODE = {
  rotate: false,
  scale: false,
  translate: false
}

Scrollable.prototype.start = function (mode) {
  // Set current interaction mode.
  //
  // Parameters:
  //   mode:
  //     rotate: bool
  //     scale: bool
  //     translate: bool
  //
  var el, it, v

  // Reset interaction mode and then add the given mode options.
  this.mode = utils.extend(Scrollable.DEFAULT_MODE, mode)

  // Create or alternatively update the manager on the fly.
  if (this._manager === null) {
    el = this.element
    it = this.item
    v = this.view
    this._manager = new Manager(el, it, v, this, this.mode)
  } else {
    this._manager.update(this.mode)
  }
}

Scrollable.prototype.restart = function (mode) {
  // Alias for start() but is more readable if recognition is really
  // "re"started.
  return this.start(mode)
}

Scrollable.prototype.resume = function () {
  // Restart with the previous mode.
  if (this._manager === null) {
    this.start(this.mode)
  }
}

Scrollable.prototype.stop = function () {
  // Turn touchability off
  if (this._manager !== null) {
    this._manager.destroy()
    this._manager = null
  }
}

module.exports = Scrollable
