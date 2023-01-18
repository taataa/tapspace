// TODO use an affineplane method instead of this file.
const plane3 = require('affineplane').plane3

module.exports = (tran, anchor) => {
  // Repair deformed offset caused by transform-origin CSS property.
  // See lengthy notes below for details.
  //
  // Parameters:
  //   tran
  //     a plane3, the plane transition
  //   anchor
  //     a point2, the anchor point, the offset.
  //
  // Return
  //   a plane3, the corrected plane transform
  //
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
  // center then the rotation center point travels a straight line
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
  const ax = anchor.x
  const ay = anchor.y
  // Countering translations
  const g = { a: 1, b: 0, x: ax, y: ay, z: 0 }
  const ig = { a: 1, b: 0, x: -ax, y: -ay, z: 0 }
  // Adjusted projection. TODO OPTIMIZE avoid function calls.
  return plane3.compose(ig, plane3.compose(tran, g))
}
