const applyTransform = require('./utils/applyTransform')
const applyTransform3d = require('./utils/applyTransform')
const proj2 = require('affineplane').proj2

module.exports = function (opts) {
  // Update the element.style.transform according to the plane placement.
  //
  // You need to call this function only when you have manually edited
  // or replaced the component.proj object.
  //
  // Parameters:
  //   opts
  //     projection
  //       optional proj2 object to be used instead of this.proj.
  //       .. Useful when the position needs visual adjustment
  //       .. without modifying the projection. See snapPixels.
  //

  let proj = this.proj

  // Handle custom projection
  if (opts && opts.projection) {
    proj = opts.projection
  }

  // The CSS transform-origin property brings complications.
  // We are forced to use the property for animated transitions
  // to look good. This is because, when the transformation
  // contains translation in addition to scale and rotation,
  // the browsers interpolate the animation so that the origin
  // translates along a straight line. The scale and rotation
  // are interpolated around it.
  //   For example, if the transform-origin is at point 0,0
  // then that corner travels the straight line, making
  // the rotation look wobbly in respect to the rotation center.
  // In tapspace, when we rotate a component about its middle,
  // the transform contains lots of translation under the hood.
  // Therefore the resulting animation wobbles regardless of
  // the starting and ending placements are correct.
  //   To prevent the wobble, we must tell the browser which
  // point of the element should move along the straight line
  // of the translation. The transform-origin property is just
  // for that purpose. If we set the origin at the component
  // center then the center point travels a straight line
  // regardless the scaling and rotation. We use the component
  // anchor point for that purpose.
  //   The main downside from using the transform origin is
  // that it modifies the effective transformation. The error
  // becomes very apparent when the transformation contains
  // rotation. Therefore we must undo the error. The math
  // follows:
  //   Let TSR be our transformation matrix with translation
  // scaling and rotation. It works correctly when transform
  // origin is at 0,0. Let F_zero denote this.
  //       F_zero(TSR) = TSR
  //   The MDN documentation on the transform-origin tells
  // how it modifies the transformation. Let F_orig be
  // the effective transformation with origin at {ox,oy}.
  // Let G be translation from zero to {ox,oy} and
  // iG its inversion, e.g. from {ox,oy} to zero.
  // According to MDN, the F_orig is computed as:
  //       F_orig(TSR) = G * TSR * iG
  //   We can see that when origin is at (0,0), then G = I
  // and F_orig = F_zero. Now let us find adjusted TSR,
  // A_tsr, so that with it F_orig equals F_zero.
  //       F_orig(A_tsr) = G * A_tsr * iG = F_zero(TSR)
  //   <=> A_tsr = iG * TSR * G
  //   In other words, the adjusted transformation inverts
  // the effects of transform-origin. The magic in this is
  // that while the error to the placement is countered,
  // the animations now work as intended because transform
  // origin is used.
  //   For more, see paper note 2022-06-21-02.
  const anc = this.anchor
  // Countering translations
  const g = { a: 1, b: 0, x: anc.x, y: anc.y }
  const ig = { a: 1, b: 0, x: -anc.x, y: -anc.y }
  // Adjusted projection. TODO OPTIMIZE avoid function calls.
  proj = proj2.compose(ig, proj2.compose(proj, g))

  if (proj.z) {
    applyTransform3d(this.element, proj)
  } else {
    applyTransform(this.element, proj)
  }
}
