module.exports = function (target) {
  // @Component:sendBelow(target)
  //
  // Reinsert this element below the given target element.
  // In other words, reinsert this element just before the target in DOM
  // so that the target is rendered after this element.
  //
  // This method reorders elements in DOM. That can cause elements to lose
  // their hover state in some browsers. See issue #173 for details.
  //
  // Parameters:
  //   target
  //     a Component
  //
  // Return
  //   this, for chaining
  //

  // Reinsert only when necessary to prevent flicker from rendering.
  if (target.element.previousElementSibling !== this.element) {
    this.element.parentNode.insertBefore(this.element, target.element)
  }

  return this
}
