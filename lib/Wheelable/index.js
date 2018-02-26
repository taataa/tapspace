//
// Wheelable
//
// Map mouse wheel input to transformations in space.
//
var Emitter = require('component-emitter')
var Recognizer = require('./Recognizer')
var utils = require('../Touchable/utils')

var Wheelable = function (view, sourceItem, targetItem) {
  // Parameters
  //   view
  //     SpaceView of the HTMLElement to listen.
  //   sourceItem
  //     We detect mouse wheel events from the element of this item.
  //   targetItem
  //     Optional. Item or function. Defaults to the sourceItem.
  //     The detected transformation is applied to this item.
  //     If a function was given, the function is called each time
  //     a transformation happens.
  //
  Emitter(this)

  if (view.getContainer() === null) {
    throw new Error('Wheelable requires a mounted view.')
  }

  this.view = view
  this.sourceItem = sourceItem

  if (typeof targetItem === 'undefined') {
    this.targetItem = sourceItem
  } else {
    this.targetItem = targetItem
  }

  if (this.view === this.sourceItem) {
    this.element = this.view.getContainer()
  } else {
    this.element = this.view.getElementBySpaceItem(this.sourceItem)

    // Ensure the element exists
    if (this.element === null) {
      throw new Error('No HTMLElement found. ' +
        'Ensure the item is in the same space with the view.')
    }
  }

  // Init interaction mode.
  this.mode = Wheelable.DEFAULT_MODE

  this._rec = null // A Recognizer. Null means deactive state.
}

Wheelable.DEFAULT_MODE = {
  rotate: false,
  scale: false,
  translate: false
}

Wheelable.prototype.start = function (mode) {
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
  this.mode = utils.extend(Wheelable.DEFAULT_MODE, mode)

  // Create or alternatively update the manager on the fly.
  if (this._rec === null) {
    el = this.element
    it = this.targetItem
    v = this.view
    this._rec = new Recognizer(el, it, v, this, this.mode)
  } else {
    this._rec.update(this.mode)
  }
}

Wheelable.prototype.restart = function (mode) {
  // Alias for start() but is more readable if recognition is really
  // "re"started.
  return this.start(mode)
}

Wheelable.prototype.resume = function () {
  // Restart with the previous mode.
  if (this._rec === null) {
    this.start(this.mode)
  }
}

Wheelable.prototype.stop = function () {
  // Turn touchability off
  if (this._rec !== null) {
    this._rec.destroy()
    this._rec = null
  }
}

module.exports = Wheelable
