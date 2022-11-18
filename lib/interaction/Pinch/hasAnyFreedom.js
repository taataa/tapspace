module.exports = function () {
  // tapspace.interaction.Pinch:hasAnyFreedom()
  //
  // Test if the interaction has any freedom dimensions enabled.
  // No freedoms is equivalent to disabled interaction.
  //
  // Return
  //   a boolean
  //
  return this.options.freedom.type !== 'I'
}
