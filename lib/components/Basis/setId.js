module.exports = function (elemId) {
  // @Basis:setId
  //
  // Set the affine element ID property.
  // This is equivalent to `basis.element.id = elemId`.
  //
  // Parameters:
  //   elemId
  //     a string, for example 'hero'
  //
  // Return
  //   this, for chaining
  //
  this.element.id = elemId

  return this
}
