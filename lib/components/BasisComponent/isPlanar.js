module.exports = function () {
  // @BasisComponent:isPlanar()
  //
  // Check if the basis is on a Plane.
  // The basis is on a plane if any of its ancestors is a Plane.
  // Plane itself is not planar except when one of its ancestors is.
  // Planes flatten their subspace. Therefore geometry on a plane may appear
  // rendered flat even when having a non-zero z coordinate.
  //
  // Return
  //   boolean
  //

  // TODO
  // Rendering tapspace components flat should not be driven by isPlanar calls
  // because CSS rules transform-style:flat and perspective:none already make
  // the browser flatten the geometry. Or should it?
  //

  let root = this
  let par = this.element.parentElement
  while (par && par.affine) {
    if (par.affine.isPlane) {
      return true
    }
    root = par.affine
    par = par.parentElement
  }

  // Root might be a flat viewport.
  if (root.isViewport && root.proj === '2d') {
    return true
  }

  return false
}
