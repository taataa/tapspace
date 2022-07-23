const Drag = require('../../interaction/Drag')

module.exports = function (opts) {
  // tapspace.components.AbstractItem:draggable(opts)
  // tapspace.components.AbstractItem:pannable(opts)
  //
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
    if (this.interactions.drag) {
      this.interactions.drag.unbind()
      this.interactions.drag = null
    }
    return
  }

  // Cannot replace old interaction
  if (this.interactions.drag) {
    throw new Error('The element already has drag interaction set.')
  }

  // Begin drag interaction
  const drag = new Drag(this, this, opts)
  drag.bind()
  this.interactions.drag = drag

  return this
}
