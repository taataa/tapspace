module.exports = function (options) {
  // @Viewport:animateOnce(options)
  //
  // TODO doc
  //
  const bases = this.space.getChildren()

  for (let i = 0; i < bases.length; i += 1) {
    const plane = bases[i]
    plane.animateOnce(options)
  }

  return this
}
