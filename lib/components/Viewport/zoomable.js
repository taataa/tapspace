const interactions = require('../../interaction')

module.exports = function (options) {
  // @Viewport:zoomable(options)
  //
  // Make the viewport zoomable.
  //
  // The viewport can be zoomed by pinch gesture, mouse wheel, and
  // some keyboard keys (+/-).
  //
  // Use options to control which zoom interactions to enable.
  //
  // Optionally you can set a pivot point, that forces the zoom and pan
  // navigation always be fixed onto the pivot point.
  //
  // Example:
  // ```
  // const view = tapspace.createView('#myspace')
  // view.zoomable()
  // ```
  //
  // Parameters
  //   options
  //     optional object with props:
  //       keyboardPanArrows
  //         boolean, default true
  //       keyboardPanWasd
  //         boolean, default false
  //       keyboardZoomPlusMinus
  //         boolean, default true
  //       wheelZoomInvert
  //         boolean, default false
  //       vanishingPoint
  //         a Point, default null
  //
  // Alternative parameters:
  //   enabled
  //     a boolean, set false to disable the ability.
  //
  // Return
  //   this, for chaining
  //

  // Find interactions
  let pinch = this.getInteraction('pinch')
  let wheel = this.getInteraction('wheel')
  let keyboardpan = this.getInteraction('keyboardpan')
  let keyboardzoom = this.getInteraction('keyboardzoom')

  // False options to unbind
  if (options === false) {
    if (pinch) {
      pinch.disableDilation()
      if (!pinch.hasAnyFreedom()) {
        this.removeInteraction('pinch')
      }
    }
    if (wheel) {
      this.removeInteraction('wheel')
    }
    if (keyboardpan) {
      this.removeInteraction('keyboardpan')
    }
    if (keyboardzoom) {
      this.removeInteraction('keyboardzoom')
    }
    return
  }

  // Default options
  if (!options) {
    options = {}
  }
  options = Object.assign({
    keyboardPanArrows: true,
    keyboardPanWasd: false,
    keyboardZoomPlusMinus: true,
    wheelZoomInvert: false,
    vanishingPoint: null
  }, options)

  if (pinch) {
    pinch.enableDilation(options.vanishingPoint)
  } else {
    pinch = new interactions.Pinch(this, this.hyperspace)
    pinch.enableDilation(options.vanishingPoint)
    this.addInteraction('pinch', pinch)
  }
  // assert: pinch is now set.

  if (wheel) {
    // Destroy the old wheel interaction for new options to take hold.
    // TODO maybe just update
    this.removeInteraction('wheel')
  }
  wheel = new interactions.WheelZoom(this, {
    invert: options.wheelZoomInvert
  })
  this.addInteraction('wheel', wheel)

  if (keyboardpan) {
    // Keyboard pan already active
    // TODO update options
  } else if (!options.vanishingPoint) {
    keyboardpan = new interactions.KeyboardPan(this, this, {
      arrows: options.keyboardPanArrows,
      wasd: options.keyboardPanWasd
    })
    this.addInteraction('keyboardpan', keyboardpan)
  }

  if (keyboardzoom) {
    // Keyboard zooming already active
    // TODO update options
  } else {
    keyboardzoom = new interactions.KeyboardZoom(this, this, {
      plusMinus: options.keyboardZoomPlusMinus,
      vanishingPoint: options.vanishingPoint
    })
    this.addInteraction('keyboardzoom', keyboardzoom)
  }

  return this
}
