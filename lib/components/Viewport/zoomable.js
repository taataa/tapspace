const interactions = require('../../interaction')

module.exports = function (options) {
  // @Viewport:zoomable(options)
  //
  // Make the viewport zoomable.
  // The viewport can be scaled by pinch gesture and mouse wheel.
  // If the pivot is not set, the viewport can also be panned meaning that
  // the viewport can be moved and zoomed freely. If the pivot point is set
  // then no pan is possible and zooming happens about the pivot.
  //
  // Example:
  // ```
  // const view = tapspace.createView('#myspace')
  // view.zoomable()
  // ```
  //
  // Parameters
  //   options, optional boolean or object with props:
  //     pivot
  //       a Point, the vanishing point for zoom, the center for scaling.
  //       If not set, enables viewport translation aka panning.
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

  if (!options) {
    options = {}
  }

  if (pinch) {
    pinch.enableDilation(options.pivot)
  } else {
    pinch = new interactions.Pinch(this, this.hyperspace, {
      applicator: 'viewport'
    })
    pinch.enableDilation(options.pivot)
    this.addInteraction('pinch', pinch)
  }
  // assert: pinch is now set.

  if (wheel) {
    // Destroy the old wheel interaction for new options to take hold.
    // TODO maybe just update
    this.removeInteraction('wheel')
  }
  wheel = new interactions.WheelZoom(this, {
    pivot: options.pivot
  })
  this.addInteraction('wheel', wheel)

  if (keyboardpan) {
    // Keyboard pan already active
    // TODO update options
  } else {
    keyboardpan = new interactions.KeyboardPan(this, this, options)
    this.addInteraction('keyboardpan', keyboardpan)
  }

  if (keyboardzoom) {
    // Keyboard zooming already active
    // TODO update options
  } else {
    keyboardzoom = new interactions.KeyboardZoom(this, this, options)
    this.addInteraction('keyboardzoom', keyboardzoom)
  }

  return this
}
