const atan2 = Math.atan2

module.exports = function () {
  // @Viewport:reorient()
  //
  // Renormalize orientation.
  // Correct rotation of the viewport to match the orientation of the content.
  // Useful in spiral fractal navigation.
  //
  // The rotation is performed about the camera position.
  // The correction is based on the orientation of visible content
  // and weighted by their relative apparent areas.
  //
  // Return
  //   this, for chaining
  //

  const measures = this.measureAll().filter(m => m.target.isItem)
  const orients = measures.map(m => m.target.getOrientation().transitRaw(this))
  const n = orients.length

  if (n === 0) {
    // Nothing to orient.
    return this
  }

  // Weight orientations by visible area in viewport.
  let samples = 0
  let weights = measures.map((m) => {
    if (m.visible) {
      if (m.areaRatio < 0.618 && m.areaRatio > 0.0001) {
        samples += 1
        return m.areaRatio
      }
    }
    return 0
  })

  // Only very large or small items. Sample weights without limits.
  if (samples === 0) {
    weights = measures.map((m) => {
      return m.areaRatio
    })
  }

  // Normalize
  const wsum = weights.reduce((acc, w) => acc + w, 0)
  const ws = weights.map(w => w / wsum)

  // Find average orientation angle, rotation around z.
  const angles = orients.map(o => atan2(o.b, o.a))
  const avgAngle = angles.reduce((acc, r, i) => acc + ws[i] * r, 0)

  // Rotate about camera z-axis
  const origin = this.atCamera()

  // rotate the viewport -> rotate the root spaces
  const hspace = this.hyperspace
  const spaces = hspace.getChildren()
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].rotateBy(-avgAngle, origin)
  }

  return this
}
