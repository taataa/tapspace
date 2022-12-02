module.exports = (el) => {
  // @Basis.findAffineAncestor(el)
  //
  // Find the nearest affine element, if any.
  // Travels DOM towards root and tests each element for affine properties
  // until one is found.
  //
  // Example:
  // ```
  // const elem = document.getElementById('myelem')
  // Basis.findAffineAncestor()
  // ```
  //
  // Parameters:
  //   el
  //     HTMLElement
  //
  // Return
  //   null, if no affine ancestor.
  //   a Basis, if has affine ancestor.
  //

  if (el && el.element && el.tran) {
    // Is a affine element already
    return el
  }

  if (el.affine) {
    // Element itself is its nearest affine ancestor.
    return el.affine
  }

  // Go through elements until affine, if any
  let par = el.parentElement
  while (par) {
    if (par.affine) {
      return par.affine
    }
    par = par.parentElement
  }

  // No affine ancestor
  return null
}
