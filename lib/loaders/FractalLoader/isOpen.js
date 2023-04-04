module.exports = function (id) {
  // Check if the node is already open.
  //
  // Return
  //   boolean
  //
  return id in this.planes
}
