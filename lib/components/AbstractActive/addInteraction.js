module.exports = function (name, interaction) {
  // tapspace.components.AbstractActive:addInteraction(name, interaction)
  //
  // Register an interaction. Throws if interaction for this name
  // already exists.
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
