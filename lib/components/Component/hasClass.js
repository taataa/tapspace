module.exports = function (className) {
  // @Component:hasClass(className)
  //
  // Test if the element has the given class name.
  // This is equivalent to `basis.element.classList.contains(className)`.
  //
  // Example:
  //   `if (item.hasClass('myitem')) { ... }`
  //
  // Parameters:
  //   className
  //     a string, for example 'banner'
  //
  // Return
  //   a boolean
  //
  return this.element.classList.contains(className)
}
