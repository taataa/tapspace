module.exports = function (id) {
  // Close the node

  if (!this.isAlive(id)) {
    throw new Error('Attempt to close non-existing node ' + id)
  }

  if (!this.isOpen(id)) {
    console.warn('Attempt to close closed node ' + id)
    return
  }

  const plane = this.planes[id]

  const kernelChildren = this.kernel(id).children

  kernelChildren.forEach(child => {
    if (this.isAlive(child.id)) {
      this.removeNode(child.id)
    }
  })

  // Register
  plane.remove()
  delete this.planes[id]
}
