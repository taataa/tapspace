module.exports = function (name) {
  // @InteractiveComponent:getInteraction(name)
  //
  // Get an interaction. Might be null.
  //
  // Return
  //   an Interaction or null if no such interaction is registered.
  //
  return this.interactions[name]
}
