const log = Math.log
const exp = Math.exp

module.exports = function () {
  // @Viewport:rescale()
  //
  // Balance scale of the root spaces near one.
  // This effectively adjusts viewport scale to better match the content scale.
  // Useful in situations where the root spaces have evolved to
  // so large or small scales, that floating point overflow or underflow
  // begins to affect viewport navigation.
  //
  // The scaling balances the space scales so that their geometric mean
  // becomes one and thus matches the viewport element scale in the host DOM.
  // Because of the geometric mean, if the root spaces contain both large
  // and small scales, the rescaling might not solve the floating point issues.
  // Therefore you must still take care of removing content and spaces
  // that have drifted too far from the viewport, but once you do, rescaling
  // is a good way to normalize the viewport to the scale of the remaining.
  //
  // The scaling is performed about the camera position in order to maintain
  // the apparent size and positions of the content.
  //
  // Return
  //   this, for chaining
  //

  const hspace = this.hyperspace
  const spaces = hspace.getChildren()
  const scales = spaces.map(c => c.getScale().transitRaw(hspace))
  const n = scales.length

  // Find a scale multiplier that makes the geometric mean of scales become 1.
  const logsum = scales.reduce((acc, s) => acc + log(s), 0)
  const logr = -logsum / n
  const r = exp(logr)

  // Scale about camera
  const origin = this.atCamera()

  // scale the viewport -> scale the root spaces
  for (let i = 0; i < n; i += 1) {
    spaces[i].scaleBy(r, origin)
  }

  return this
}
