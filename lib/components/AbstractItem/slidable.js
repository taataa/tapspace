const Slide = require('../../interaction/Slide')

module.exports = function (options) {
  // tapspace.components.AbstractItem:slidable(options)
  // tapspace.components.AbstractItem:slideable
  //
  // A slidable component can be moved along a straight line.
  //
  // Parameters:
  //   options
  //     a boolean, set false to disable the slide ability.
  //     OR an optional object with properties:
  //       direction
  //         a Direction or Vector. Specifies a line along which
  //         .. the item can be slid.
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    if (this.interactions.slide) {
      this.interactions.slide.unbind()
      delete this.interactions.slide
    }
    return
  }

  // Replace old interaction
  if (this.interactions.slide) {
    console.warn('The element already had an active slide interaction.')
    this.interactions.slide.unbind()
  }

  // Cancel contradicting interactions
  if (this.interactions.drag) {
    this.interactions.drag.unbind()
    delete this.interactions.drag
  }

  // Begin slide interaction
  const slide = new Slide(this, this, options)
  this.interactions.slide = slide
  slide.bind()

  return this
}
