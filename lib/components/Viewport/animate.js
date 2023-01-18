module.exports = function (options) {
  // @Viewport:animate(options)
  //
  // TODO doc
  //
  const spaces = this.hyperspace.getChildren()

  for (let i = 0; i < spaces.length; i += 1) {
    const space = spaces[i]
    space.animate(options)
  }

  return this
}
