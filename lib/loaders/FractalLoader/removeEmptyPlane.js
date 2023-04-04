module.exports = function (id) {
  // Remove plane if it is empty.
  //

  if (!this.isOpen(id)) {
    throw new Error('Attempt to remove non-existing plane')
  }

  if (this.isEmpty(id)) {
    const plane = this.planes[id]
    // Remove from DOM
    plane.remove()
    // Register
    delete this.planes[id]
  }
}
