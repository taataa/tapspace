module.exports = function (id) {
  // @TreeLoader:getSpace(id)
  //
  // Get a space by its ID. Null if does not exist.
  //
  // Parameters:
  //   id
  //     a string, the space ID
  //
  // Return
  //   a Component or null
  //
  const s = this.spaces[id]
  if (s) {
    return s
  }
  return null
}
