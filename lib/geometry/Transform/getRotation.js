const fine = require('affineplane')
const helm3 = fine.helm3

module.exports = function () {
  // @Transform:getRotation()
  //
  // Get the rotating component of the transform without translation
  // and scaling.
  //
  // Return
  //   a Transform
  //

  // TODO use affineplane v3 helm3.getRotation
  const m = helm3.getScale(this.helm)

  let helm
  if (m === 0) {
    helm = helm3.ROT0
  } else {
    helm = {
      a: this.helm.a / m,
      b: this.helm.b / m,
      x: 0,
      y: 0,
      z: 0
    }
  }

  const Transform = this.constructor
  return new Transform(this.basis, helm)
}
