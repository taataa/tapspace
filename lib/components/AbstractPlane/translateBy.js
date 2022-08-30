const vec2 = require('affineplane').vec2

module.exports = function (translation, opts) {
  // tapspace.components.AbstractPlane:translateBy(translation, opts)
  //
  // Translate the element along x and y axis.
  //
  // Parameters
  //   translation
  //     {x,y,z} on the parent, a Vector, or a Transform
  //   opts
  //     TODO something?
  //
  // Return
  //   this, for chaining
  //
  let vec = { x: translation.x, y: translation.y, z: translation.z }
  if (translation.basis) {
    const plane = translation.basis.getTransitionToParentOf(this)
    vec = vec2.transitTo(vec, plane)
  }

  this.tran = {
    a: this.tran.a,
    b: this.tran.b,
    x: this.tran.x + vec.x,
    y: this.tran.y + vec.y,
    z: this.tran.z + vec.z
  }

  this.renderTransform(opts)

  return this
}
