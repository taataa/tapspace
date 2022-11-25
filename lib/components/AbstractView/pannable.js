const Pinch = require('../../interaction/Pinch')

module.exports = function (options) {
  // @Viewport:pannable(options)
  //
  // Make the viewport pannable (= draggable).
  // The view can be moved freely by a set of pointers.
  // The view maintains the size and the angle.
  //
  // Parameters:
  //   options, various types:
  //     a boolean. Set false to disable.
  //
  // Return
  //   this, for chaining
  //

  // Find interaction
  let pinch = this.getInteraction('pinch')

  // False options to disable panning.
  if (options === false) {
    if (pinch) {
      pinch.disableTranslation()
      if (!pinch.hasAnyFreedom()) {
        this.removeInteraction('pinch')
      }
    }
    return
  }

  if (pinch) {
    pinch.enableTranslation()
  } else {
    pinch = new Pinch(this, this.space, {
      applicator: 'viewport'
    })
    pinch.enableTranslation()
    this.addInteraction('pinch', pinch)
  }

  return this
}
