module.exports = function (id) {
  // Open the node.
  //
  // Parameters:
  //   id
  //     the identifier of the node to open. Will be the ID of the plane too.
  //

  if (!this.isAlive(id)) {
    console.warn('Attempt to open dead node ' + id)
    return
  }

  if (!this.isOpen(id)) {
    this.createPlane(id)
  }

  // Populate the plane
  this.populatePlane(id)
}
