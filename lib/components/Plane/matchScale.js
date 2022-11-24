// TODO use helm3.getDilation instead
const getDilation = (helm) => {
  const a = helm.a
  const b = helm.b
  const m = Math.sqrt(a * a + b * b)

  return {
    a: m,
    b: 0,
    x: 0,
    y: 0,
    z: 0
  }
}

module.exports = function (target) {
  // @Plane:matchScale(target)
  //
  // Dilate this plane so that its scale matches
  // the scale of the target plane.
  //
  // Parameters:
  //   target
  //     an AbstractPlane
  //
  // Return
  //   this, for chaining
  //
  if (!target.atAnchor) {
    throw new Error('Invalid target to match position.')
  }

  const helm = this.getTransitionTo(target)
  const dil = getDilation(helm)

  this.transformBy(dil)

  return this
}
