module.exports = function (id) {
  // Check if the node is already rendered.
  //
  // Return
  //   boolean
  //
  return id in this.nodes
}
