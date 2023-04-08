module.exports = function (id) {
  // Open parent nodes and populate siblings for the given node.
  //

  this.openParent(id)
  this.openSiblings(id)
}
