const Pinch = require('../../interaction/Pinch')

module.exports = function (options) {
  // @Item:draggable(options)
  // @Item:pannable
  // @Item:translatable
  //
  // Make item draggable.
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Parameters:
  //   options, various types:
  //     a boolean. Set false to disable draggability.
  //
  // Return
  //   this, for chaining
  //

  // NOTE Draggable is better term than movable because
  // movable is meaningful in two sense: moveable programmatically
  // or moveable physically by user.
  //

  // Find existing interaction
  let pinch = this.getInteraction('pinch')

  // False to disable
  if (options === false) {
    if (pinch) {
      pinch.disableTranslation()
      if (!pinch.hasAnyFreedom()) {
        this.removeInteraction('pinch')
      }
    }
    return this
  }

  if (pinch) {
    pinch.enableTranslation()
  } else {
    pinch = new Pinch(this, this)
    pinch.enableTranslation()
    this.addInteraction('pinch', pinch)
  }

  return this
}
