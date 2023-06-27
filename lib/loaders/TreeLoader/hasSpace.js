module.exports = function (id) {
  // @TreeLoader:hasSpace(id)
  //
  // Test if the loader has the space by its ID.
  // Useful for checking if the space is ready or removed.
  //
  // Parameters:
  //   id
  //     a string, the space ID
  //
  // Return
  //   a boolean
  //
  return id in this.spaces
}
