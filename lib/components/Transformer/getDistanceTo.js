module.exports = function (target) {
  // @Transformer:getDistanceTo(target)
  //
  // Get distance between the transformer anchor to
  // the anchor of the target Component.
  // If the target does not have an anchor, default is (0,0).
  //
  // Parameters
  //   target
  //     a Component or a Point
  //
  // Return
  //   a Distance
  //

  // Pick starting point
  const origin = this.atAnchor()
  // Pick ending point
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

  return origin.getDistanceTo(point)
}
