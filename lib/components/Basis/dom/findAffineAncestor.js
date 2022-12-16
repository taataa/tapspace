module.exports = (el) => {
  // @Basis.findAffineAncestor(el)
  //
  // Find the nearest affine element, if any.
  // Travels DOM towards document root and tests each element along the way for
  // affine properties until one is found or the document root is reached.
  //
  // Example:
  // ```
  // const btn = document.getElementById('mybutton')
  // const affine = Basis.findAffineAncestor(btn)
  // if (affine) { affine.rotateByDegrees(10) }
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
  // Complexity:
  //   O(D) where D is the depth of the document.
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
