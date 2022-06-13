const PanLayers = require('../../interaction/PanLayers')

module.exports = function (opts) {
  // Make item draggable.
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Return
  //   this, for chaining
  //

  // NOTE Draggable is better term than movable because
  // movable is meaningful in two sense: moveable programmatically
  // or moveable physically by user.
  //

  // False to unbind
  if (opts === false) {
    if (this.interactions.pan) {
      this.interactions.pan.unbind()
      this.interactions.pan = null
    }
    return
  }

  // Cannot replace old interaction
  if (this.interactions.pan) {
    throw new Error('The element already has pan interaction set.')
  }

  // Begin interaction
  const pan = new PanLayers(this, opts)
  pan.bind()
  this.interactions.pan = pan

  return this
}
