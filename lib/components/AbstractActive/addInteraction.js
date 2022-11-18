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
  this.interactions[name] = interaction
  return this
}
