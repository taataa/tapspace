module.exports = function () {
  // Affine ancestors, ordered from the immediate parent to
  // the farthest ancestor, the immediate parent first.
  //
  // Return
  //   array of elements
  //
  const arr = []
  let el = this.el.parentElement
  while (el.affine) {
    arr.push(el)
    el = el.parentElement
  }
  return arr
}
