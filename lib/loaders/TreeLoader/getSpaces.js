module.exports = function () {
  // @TreeLoader:getSpaces()
  //
  // Get all loaded spaces.
  //
  // Return
  //   an array of Component
  //
  return Object.values(this.spaces)
}
