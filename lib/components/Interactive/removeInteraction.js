module.exports = function (name) {
  // @Interactive:removeInteraction(name)
  //
  // Unregister an interaction. If interaction does not exist,
  // does nothing.
  //
  // Parameters:
  //   name
  //     a string, name of the interaction to remove.
  //
  // return
  //   this, for chaining
  //
  const intera = this.interactions[name]

  if (intera) {
    intera.unbind()
    delete this.interactions[name]
  }

  return this
}
