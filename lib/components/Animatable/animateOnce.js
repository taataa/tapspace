const applyTransition = require('./dom/applyTransition')

module.exports = function (options) {
  // @Animatable:animateOnce
  //
  // Animate the next move of the component.
  // Uses CSS transition property.
  // After the animation ends, the animation settings are removed so
  // that the next transformation is not animated by default.
  //
  // Parameters:
  //   options
  //     optional object with properties
  //       duration
  //         optional string. The transition-duration value,
  //         .. e.g. '500ms' or '2s'.
  //         .. Default is '200ms'.
  //       easing
  //         optional string. The transition-timing-function,
  //         .. e.g. 'linear', 'ease-in', or
  //         ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //       delay
  //         optional string. The transition-delay value, e.g.
  //         .. '500ms' or '2s'.
  //         .. Default is '0ms'.
  //
  // Return
  //   this, for chaining
  //

  // TODO Cancel animateOnce if the element did not move in this round.
  // TODO Otherwise it might stay haunting.

  const elem = this.element

  if (this.ontransitionend) {
    // Continue current animation.
    // Prevent upcoming transform update from canceling the animation.

    // Unlisten the old ones as we are making new ones.
    elem.removeEventListener('transitioncancel', this.ontransitioncancel)
    elem.removeEventListener('transitionend', this.ontransitionend)
    this.ontransitioncancel = null
    this.ontransitionend = null
  }

  this.ontransitioncancel = (ev) => {
    // Transition events bubble. Skip events from descendants in DOM.
    if (ev.target === this.element && this.ontransitionend) {
      this.ontransitionend(ev)
    }
  }

  // Remove animation properties after the next animation.
  // Make sure to remove the animation listeners also.
  this.ontransitionend = (ev) => {
    // Transition events bubble. Skip events from descendants in DOM.
    if (ev.target === this.element && this.ontransitionend) {
      // Stop animation.
      elem.style.removeProperty('transition')

      elem.removeEventListener('transitioncancel', this.ontransitioncancel)
      elem.removeEventListener('transitionend', this.ontransitionend)
      this.ontransitioncancel = null
      this.ontransitionend = null

      // Animation has ended. Time for idle event.
      this.requestIdle()
    }
  }

  elem.addEventListener('transitioncancel', this.ontransitioncancel)
  elem.addEventListener('transitionend', this.ontransitionend)

  applyTransition(elem, options)

  return this
}
