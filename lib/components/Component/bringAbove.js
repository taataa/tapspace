module.exports = function (target) {
  // @Component:bringAbove(target)
  //
  // Reinsert the element above the given target element.
  //
  // Parameters:
  //   target
  //     a Component
  //
  // Return
  //   this, for chaining
  //

  const nextSibling = target.element.nextElementSibling
  this.element.parentNode.insertBefore(this.element, nextSibling)

  return this
}
