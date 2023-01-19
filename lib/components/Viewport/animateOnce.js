module.exports = function (options) {
  // @Viewport:animateOnce(options)
  //
  // TODO doc
  //
  const spaces = this.hyperspace.getChildren()

  for (let i = 0; i < spaces.length; i += 1) {
    const space = spaces[i]
    space.animateOnce(options)
  }

  return this
}
