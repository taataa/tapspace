module.exports = function (target) {
  // @Plane:matchPosition(target)
  //
  // Translate this plane so that its anchor matches the anchor
  // of the target plane.
  //
  // Parameters:
  //   target
  //     a Plane
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
