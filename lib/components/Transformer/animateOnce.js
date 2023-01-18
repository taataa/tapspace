const applyTransition = require('./dom/applyTransition')

module.exports = function (options) {
  // @Plane:animateOnce
  //
  // Animate the next plane move.
  //
  // Parameters:
  //   options
  //     an object with properties:
  //       TODO doc
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
    return this
  }

  const elem = this.element

  // Remove animation properties after the next animation.
  // Make sure to remove the animation listeners also.
  const self = this
  this.ontransitionend = (ev) => {
    elem.style.removeProperty('transition')
    if (self.ontransitionend) {
      self.removeEventListener('transitionend', self.ontransitionend)
      self.ontransitionend = null
    }
  }

  elem.addEventListener('transitionend', this.ontransitionend)

  applyTransition(elem, options)

  return this
}
