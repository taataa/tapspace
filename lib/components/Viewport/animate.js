module.exports = function (options) {
  // @Viewport:animate(options)
  //
  // TODO doc
  //
  const bases = this.space.getChildren()

  for (let i = 0; i < bases.length; i += 1) {
    const plane = bases[i]
    plane.animate(options)
  }

  return this
}
