const Drag = require('../../interaction/Drag')

module.exports = function (opts) {
  // tapspace.components.AbstractItem:draggable(opts)
  // tapspace.components.AbstractItem:pannable(opts)
  //
  // Make item draggable.
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Parameters:
  //   opts, various types
  //     a boolean. Set false to disable draggability.
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
      delete this.interactions.drag
    }
    return
  }

  // Replace old interaction
  if (this.interactions.drag) {
    console.warn('The element already had an active drag interaction.')
    this.interactions.drag.unbind()
  }

  // Cancel contradicting interactions
  if (this.interactions.slide) {
    this.interactions.slide.unbind()
    delete this.interactions.slide
  }

  // Begin drag interaction
  const drag = new Drag(this, this, opts)
  this.interactions.drag = drag
  drag.bind()

  return this
}
