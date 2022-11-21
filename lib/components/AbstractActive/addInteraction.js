module.exports = function (name, interaction) {
  // Register an interaction.
  //
  // Parameters:
  //   name
  //     a string, name of the interaction. Necessary to prevent doubles.
  //   interaction
  //     an Interaction
  //
  // return
  //   this, for chaining
  //

  // Check if already registered.
  const intera = this.interactions[name]
  if (intera) {
    throw new Error('The element already has interaction ' + name)
  }

  this.interactions[name] = interaction

  return this
}
