module.exports = (el) => {
  // Find the nearest affine element, if any.
  //
  // Parameters:
  //   el
  //     HTMLElement
  //
  // Return
  //   if no affine ancestor: null
  //   otherwise: a Basis
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
