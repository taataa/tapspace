const affineplane = require('affineplane')
const helm3 = affineplane.helm3
const vec3 = affineplane.vec3

module.exports = function (translation) {
  // tapspace.components.AbstractPlane:translateBy(translation)
  //
  // Translate the element along x-, y-, and z-axis.
  // Translation does not rotate or scale the element.
  // Translation along z-axis can change the perceived size of the element.
  //
  // Parameters
  //   translation
  //     Any of the following:
  //       a vec3 {x,y,z} represented on the parent.
  //       a Vector.
  //       a Transform, from which only the translation is extracted.
  //
  // Return
  //   this, for chaining
  //

  let vec
  if (translation.changeBasis) {
    // Either Vector or Transform
    const tranToParent = translation.basis.getTransitionToParentOf(this)
    if (translation.vec) {
      vec = vec3.transitTo(translation.vec, tranToParent)
    } else if (translation.helm) {
      // Treat as vector
      vec = vec3.transitTo(translation.helm, tranToParent)
    }
  } else {
    // A plain object. Normalize to 3D.
    vec = {
      x: translation.x,
      y: translation.y,
      z: translation.z ? translation.z : 0
    }
  }

  this.tran = helm3.addTranslation(this.tran, vec)

  this.renderTransform()

  return this
}
