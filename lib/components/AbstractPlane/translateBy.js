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
  let vec = { x: translation.x, y: translation.y,  translation.z }
  if (translation.basis) {
    const tran = translation.basis.getTransitionToParentOf(this)
    vec = vec2.transitTo(vec, tran)
  }

  this.plane = {
    a: this.plane.a,
    b: this.plane.b,
    x: this.plane.x + vec.x,
    y: this.plane.y + vec.y,
    z: this.plane.z + vec.z
  }

  this.renderTransform(opts)

  return this
}
