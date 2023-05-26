module.exports = function () {
  // @Hyperspace:atAnchor()
  //
  // Reuse viewport anchor.
  //
  const viewport = this.getParent()
  return viewport.atAnchor()
}
