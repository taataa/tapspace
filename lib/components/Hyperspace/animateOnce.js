const applyTransition = require('../TransformerComponent/dom/applyTransition')

module.exports = function (options) {
  // @Hyperspace:animateOnce
  //
  // Animate the next move of the viewport.
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

  // Ensure no duplicates
  if (this.ontransitionend) {
    // Cannot animate because element already has an animation.
    // Happens for example when element was already in place and
    // no transition happened.

    // TODO this indicates that something new has happened.
    // Thus transitioncancel should not stop the animation,
    // except when it does.

    return this
  }

  const elem = this.element

  // Remove animation properties after the next animation.
  // Make sure to remove the animation listeners also.
  const self = this
  this.ontransitionend = (ev) => {
    elem.style.removeProperty('transition')
    if (self.ontransitionend) {
      self.removeEventListener('transitioncancel', self.ontransitionend)
      self.removeEventListener('transitionend', self.ontransitionend)
      self.ontransitionend = null

      // Commit animation results.
      this.viewport.emit('idle')
    }
  }

  // TODO transitioncancel should trigger if we do non-animated move
  // TODO and it should not trigger if we just altered the direction.
  elem.addEventListener('transitioncancel', this.ontransitionend)
  elem.addEventListener('transitionend', this.ontransitionend)

  applyTransition(elem, options)

  return this
}
