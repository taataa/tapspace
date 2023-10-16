module.exports = function (name) {
  // @Interactive:hasInteraction(name)
  //
  // Test if the component has an active interaction.
  //
  // Example:
  // ```
  // > item.hasInteraction('tap')
  // false
  // ```
  //
  // Return
  //   a boolean
  //
  return name in this.interactions
}
