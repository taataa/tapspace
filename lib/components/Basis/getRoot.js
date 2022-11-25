module.exports = function () {
  // @Basis:getRoot()
  //
  // Get the affine root. Will return self if has no affine parent.
  //
  // Return
  //   a Basis
  //

  let root = this
  let par = this.element.parentElement
  while (par && par.affine) {
    root = par.affine
    par = par.parentElement
  }

  return root
}