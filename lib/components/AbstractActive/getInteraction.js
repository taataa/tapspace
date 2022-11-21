module.exports = function (name) {
  // tapspace.components.AbstractActive:getInteraction(name)
  //
  // Get an interaction. Might be null.
  //
  // Return
  //   an Interaction or null if no such interaction is registered.
  //
  return this.interactions[name]
}
