module.exports = function (className) {
  // @Basis:addClass
  //
  // Add a CSS class name into the affine element.
  // This is equivalent to `basis.element.classList.add(className)`.
  //
  // Parameters:
  //   className
  //     a string, for example 'my-item'
  //
  // Return
  //   this, for chaining
  //
  // Complexity:
  //   O(1)
  //
  this.element.classList.add(className)

  return this
}
