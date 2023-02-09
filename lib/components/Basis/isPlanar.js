module.exports = function () {
  // @Basis:isPlanar()
  //
  // Check if the basis is a Plane or on a Plane.
  // The basis is on a plane if any of its ancestors is a Plane.
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

  let par = this.element
  while (par && par.affine) {
    if (par.affine.isPlane) {
      return true
    }
    par = par.parentElement
  }

  return false
}
