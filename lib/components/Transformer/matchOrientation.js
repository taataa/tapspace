// TODO use helm3.getRotation instead
const getRotation = (helm) => {
  const a = helm.a
  const b = helm.b
  const m = Math.sqrt(a * a + b * b)

  if (m === 0) {
    // Arbitrary rotation, return identity.
    return {
      a: 1,
      b: 0,
      x: 0,
      y: 0,
      z: 0
    }
  }

  // Make it orthogonal
  return {
    a: a / m,
    b: b / m,
    x: 0,
    y: 0,
    z: 0
  }
}

module.exports = function (target) {
  // @Transformer:matchOrientation(target)
  //
  // Rotate this basis so that its orientation matches
  // the target basis.
  //
  // Parameters:
  //   target
  //     a Basis
  //
  // Return
  //   this, for chaining
  //
  if (!target.atAnchor) {
    throw new Error('Invalid target to match position.')
  }

  const helm = this.getTransitionTo(target)
  const rot = getRotation(helm)

  this.transformBy(rot)

  return this
}
