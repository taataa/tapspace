const applyTransition = require('./dom/applyTransition')

module.exports = function (options) {
  // @Animatable:animateOnce
  //
  // Animate the next move of the component.
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
  //         .. e.g. 'linear' or
  //         ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //       delay
  //         optional string. The transition-delay value, e.g.
  //         .. '500ms' or '2s'.
  //         .. Default is '0ms'.
  //
  // Return
  //   this, for chaining
  //

  // TODO cancel animateOnce if the element did not move in this round.

  this.numAnimations += 1

  // Ensure no duplicates
  if (this.ontransitionend) {
    // Cannot animate because element already has an animation.
    // Happens for example when element was already in place and
    // no transition happened.

    return this
  }

  const elem = this.element

  this.ontransitioncancel = (ev) => {
    this.numAnimations -= 1

    if (this.numAnimations === 0) {
      this.ontransitionend(ev)
    }
  }

  // Remove animation properties after the next animation.
  // Make sure to remove the animation listeners also.
  this.ontransitionend = (ev) => {
    // All animations finished.
    this.numAnimations = 0
    // Avoid animating the next.
    elem.style.removeProperty('transition')
    if (this.ontransitionend) {
      this.removeEventListener('transitioncancel', this.ontransitionend)
      this.removeEventListener('transitionend', this.ontransitionend)
      this.ontransitioncancel = null
      this.ontransitionend = null

      // Commit animation results.
      this.emit('idle')
    }
  }

  elem.addEventListener('transitioncancel', this.ontransitioncancel)
  elem.addEventListener('transitionend', this.ontransitionend)

  applyTransition(elem, options)

  return this
}
