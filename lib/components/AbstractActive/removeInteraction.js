module.exports = function (name) {
  // Unregister an interaction.
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
