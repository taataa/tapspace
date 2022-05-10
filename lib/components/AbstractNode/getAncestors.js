module.exports = function () {
  // Affine ancestors, ordered from the immediate parent to
  // the farthest ancestor, the immediate parent first.
  //
  // Return
  //   array of AbstractNode
  //
  const arr = []
  let par = this.element.parentElement
  while (par && par.affine) {
    arr.push(par.affine)
    par = par.parentElement
  }
  return arr
}
