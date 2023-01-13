const Pinch = require('../../interaction/Pinch')
const KeyboardPan = require('../../interaction/KeyboardPan')

module.exports = function (options) {
  // @Viewport:pannable(options)
  //
  // Make the viewport pannable (= draggable).
  // The view can be moved freely by a set of pointers.
  // The view maintains the size and the angle.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       step
  //         a Distance. Default is 100 in viewport pixels.
  //
  // Alternative parameters:
  //   options
  //     a boolean. Set false to disable.
  //
  // Return
  //   this, for chaining
  //

  // Find interaction
  let pinch = this.getInteraction('pinch')
  let keyboardpan = this.getInteraction('keyboardpan')

  // False options to disable panning.
  if (options === false) {
    if (pinch) {
      pinch.disableTranslation()
      if (!pinch.hasAnyFreedom()) {
        this.removeInteraction('pinch')
      }
    }
    if (keyboardpan) {
      this.removeInteraction('keyboardpan')
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

  if (keyboardpan) {
    // Keyboard panning already active
    // TODO update options
  } else {
    keyboardpan = new KeyboardPan(this, this, options)
    this.addInteraction('keyboardpan', keyboardpan)
  }

  return this
}
