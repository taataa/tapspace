const fine = require('affineplane')
const helm3 = fine.helm3
const vec3 = fine.vec3

module.exports = function (translation) {
  // @TransformerComponent:translateBy(translation)
  //
  // Translate the element along x-, y-, and z-axis.
  // Translation does not rotate or scale the element.
  // Translation along z-axis can change the perceived size of the element.
  //
  // Example:
  // ```
  // const vec = item.atTopLeft().getVectorTo(item.atBottomRight())
  // plane.translateBy(vec)
  // ```
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

  // It is common to mix offset and translate
  if (typeof translation !== 'object') {
    throw new Error('Invalid translation parameters. Use vector.')
  }

  let vec
  if (translation.changeBasis) {
    // Is either a Vector or Transform.
    const basisOnParent = translation.basis.getTransitionToParentOf(this)
    // Represent the vector in the outer basis of this.
    if (translation.vec) {
      vec = vec3.transitFrom(translation.vec, basisOnParent)
    } else if (translation.helm) {
      // Treat as vector
      vec = vec3.transitFrom(translation.helm, basisOnParent)
    }
  } else {
    // A plain object. Normalize to 3D.
    vec = {
      x: translation.x,
      y: translation.y,
      z: translation.z ? translation.z : 0
    }
  }

  // Apply the vector
  this.tran = helm3.addTranslation(this.tran, vec)

  this.renderTransform()

  return this
}
