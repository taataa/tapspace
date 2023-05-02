module.exports = function () {
  // @FractalLoader:cardinality()
  //
  // The number of rendered nodes.
  //
  // Return
  //   a number
  //
  return Object.keys(this.nodes).length
}
