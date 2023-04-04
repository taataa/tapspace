module.exports = function (id) {
  // Check if the plane is empty.
  // Plane is considered empty if it does not exist
  // or if it has no content.
  //
  if (!this.isOpen(id)) {
    return true
  }

  const children = this.kernel(id).children
  const n = children.length

  for (let i = 0; i < n; i += 1) {
    const cid = children[i].id
    if (this.isAlive(cid)) {
      // Kid alive, thus plane not empty
      return false
    }
  }

  // No kid was alive
  return true
}
