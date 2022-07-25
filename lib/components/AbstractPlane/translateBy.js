const vector2 = require('affineplane').vector2

module.exports = function (translation, opts) {
  // tapspace.components.AbstractPlane:translateBy(translation, opts)
  //
  // Translate the element along x and y axis.
  //
  // Parameters
  //   translation
  //     {x,y} on the parent, a Vector, or a Transform
  //   opts
  //     TODO something?
  //
  // Return
  //   this, for chaining
  //
  let vec = { x: translation.x, y: translation.y }
  if (translation.basis) {
    const proj = translation.basis.getProjectionToParentOf(this)
    vec = vector2.project(vec, proj)
  }

  this.proj = {
    a: this.proj.a,
    b: this.proj.b,
    x: this.proj.x + vec.x,
    y: this.proj.y + vec.y
  }

  this.renderTransform(opts)

  return this
}
