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

  const anc0 = this.atAnchor()

  let anc1
  if (target.atAnchor) {
    anc1 = target.atAnchor()
  } else {
    anc1 = target.at(0, 0)
  }

  const trip = anc0.getVectorTo(anc1)

  return this.translateBy(trip)
}
