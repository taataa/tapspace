module.exports = function (target) {
  // @Transformer:matchPosition(target)
  //
  // Translate this basis so that its transformer anchor matches the anchor
  // of the target.
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

  const anc0 = this.atAnchor()
  const anc1 = target.atAnchor()

  const trip = anc0.getVectorTo(anc1)

  return this.translateBy(trip)
}
