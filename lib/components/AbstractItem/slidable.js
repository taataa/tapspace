const Slide = require('../../interaction/Slide')

module.exports = function (options) {
  // tapspace.components.AbstractItem:slidable(options)
  // tapspace.components.AbstractItem:slideable
  //
  // A slidable component can be moved along a straight line.
  //
  // Parameters:
  //   opts
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
      this.interactions.slide = null
    }
    return
  }

  // Cannot replace old interaction
  if (this.interactions.slide) {
    throw new Error('The element already has an active slide interaction.')
  }

  // Begin slide interaction
  const slide = new Slide(this, this, options)
  this.interactions.slide = slide
  slide.bind()

  return this
}
