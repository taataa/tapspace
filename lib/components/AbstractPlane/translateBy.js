const vec3 = require('affineplane').vec3

module.exports = function (translation) {
  // tapspace.components.AbstractPlane:translateBy(translation)
  //
  // Translate the element along x-, y-, and z-axis.
  // Translation does not rotate or scale the element.
  // Translation along z-axis can change the perceived size of the element.
  //
  // Parameters
  //   translation
  //     {x,y,z} on the parent, a Vector, or a Transform
  //
  // Return
  //   this, for chaining
  //
  let vec = {
    x: translation.x,
    y: translation.y,
    z: translation.z ? translation.z : 0 // default to zero if 2d vec given
  }
  if (translation.basis) {
    const plane = translation.basis.getTransitionToParentOf(this)
    vec = vec3.transitTo(vec, plane)
  }

  this.tran = {
    a: this.tran.a,
    b: this.tran.b,
    x: this.tran.x + vec.x,
    y: this.tran.y + vec.y,
    z: this.tran.z + vec.z
  }

  this.renderTransform()

  return this
}
