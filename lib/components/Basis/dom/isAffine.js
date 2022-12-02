module.exports = (element) => {
  // @Basis.isAffine(element)
  //
  // Test if the given HTMLElement is affine.
  // An HTMLElement is affine if elem.affine object is set and
  // elem.affine is a Basis or inherits Basis.
  //
  // Example:
  // ```
  // const el = document.getElementById('myelem')
  // if (Basis.isAffine(el)) { ... }
  // ```
  //
  // Parameters:
  //   element
  //     an HTMLElement or any other object.
  //
  // Return:
  //   boolean. True if the given element is HTMLElement with affine property.
  //
  return element && element.affine
}
