module.exports = function (target) {
  // @Component:bringAbove(target)
  //
  // Reinsert the element above the given target element.
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
  if (this.element.nextElementSibling !== target.element) {
    const nextSibling = target.element.nextElementSibling
    this.element.parentNode.insertBefore(this.element, nextSibling)
  }

  return this
}
