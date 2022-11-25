const Slide = require('../../interaction/Slide')

module.exports = function (options) {
  // @Item:slidable(options)
  // @Item:slideable
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
    this.removeInteraction('slide')
    return
  }

  // Cancel contradicting interactions
  this.removeInteraction('pinch')

  // Begin slide interaction
  const slide = new Slide(this, this, options)
  this.addInteraction('slide', slide)

  return this
}
