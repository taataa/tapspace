const log = Math.log
const exp = Math.exp

module.exports = function (origin) {
  // @Hyperspace:rescale(origin)
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
  // The scaling is done about the given origin point.
  //
  // Parameters
  //   origin
  //     a Point
  //
  // Return
  //   this, for chaining
  //

  const children = this.getChildren()

  const hspace = this
  const scales = children.map(c => c.getScale().transitRaw(hspace))
  const n = scales.length
  const logsum = scales.reduce((acc, s) => acc + log(s), 0)
  const logr = -logsum / n
  const r = exp(logr)

  children.forEach(child => {
    child.scaleBy(r, origin)
  })

  return this
}
