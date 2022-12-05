module.exports = function (className) {
  // @Basis:removeClass
  //
  // Remove a CSS class name from the affine element.
  // This is equivalent to `basis.element.classList.remove(className)`.
  //
  // Parameters:
  //   className
  //     a string, for example 'my-item'
  //
  // Return
  //   this, for chaining
  //
  this.element.classList.remove(className)

  return this
}
