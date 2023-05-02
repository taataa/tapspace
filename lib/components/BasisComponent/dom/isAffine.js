module.exports = (element) => {
  // @BasisComponent.isAffine(element)
  //
  // Test if the given HTMLElement is affine.
  // An HTMLElement is affine if elem.affine object is set
  // and that the elem.affine is a BasisComponent or inherits BasisComponent.
  //
  // Example:
  // ```
  // const el = document.getElementById('myelem')
  // if (BasisComponent.isAffine(el)) { ... }
  // ```
  //
  // Parameters:
  //   element
  //     an HTMLElement or any other object.
  //
  // Return:
  //   boolean. True if the given element is HTMLElement with affine property.
  //
  // Complexity:
  //   O(1)
  //
  return element && element.affine
}
