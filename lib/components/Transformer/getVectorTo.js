module.exports = function (target) {
  // @Transformer:getVectorTo(target)
  //
  // Get vector from this component's anchor to the target.
  // If target does not have an anchor, we assume (0,0) for the anchor.
  //
  // Parameters
  //   target
  //     a Component, Basis, or Point
  //
  // Return
  //   a Vector, represented on this plane.
  //
  let point
  if (target.isPoint) {
    point = target
  } else if (target.atAnchor) {
    point = target.atAnchor()
  } else if (target.at) {
    point = target.at(0, 0)
  } else {
    throw new Error('Invalid target argument: ' + target)
  }

  return this.atAnchor().getVectorTo(point)
}
