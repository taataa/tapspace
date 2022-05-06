module.exports = () => {
  // Return a projection from the coordinate system of the element
  // to its parent.
  //
  // TODO what if parent is non-affine
  //
  return {
    a: this.proj.a, // copy
    b: this.proj.b,
    x: this.proj.x,
    y: this.proj.y
  }
}
