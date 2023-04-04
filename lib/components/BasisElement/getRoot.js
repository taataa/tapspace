module.exports = function () {
  // @BasisElement:getRoot()
  //
  // Get the affine root. Will return self if has no affine parent.
  //
  // Return
  //   a BasisElement
  //
  // Complexity
  //   O(d) where d is the depth of the affine tree.
  //

  let root = this
  let par = this.element.parentElement
  while (par && par.affine) {
    root = par.affine
    par = par.parentElement
  }

  return root
}
