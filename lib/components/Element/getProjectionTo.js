const projBetween = require('../../dom/projectionBetween')

module.exports = function (target) {
  // Projection from the coordinate system of this element
  // to the coordinate system of the target element.
  //
  // Parameters
  //   target
  //     AffineElement or HTMLElement
  //
  // Return
  //   proj
  //     projection from this to target
  //   null
  //     if no projection to the target can be found
  //
  // Throws
  //   if target is non-affine
  //
  if (target.affine) {
    // Target is HTMLElement
    return projBetween(this.el, target)
  }
  if (target.el && target.proj) {
    // Target is AffineElement
    return projBetween(this.el, target.el)
  }
  // Target is non-affine
  throw new Error('Projection target is non-affine.')
}

// TODO alternative names
// proto.delta =
// proto.project =
// proto.projection =
// proto.projectionTo =
