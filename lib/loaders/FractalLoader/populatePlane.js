module.exports = function (id) {
  // Create children for the plane.
  // Plane must exist.
  // Children may exist, missing children are created.
  //
  // Parameters:
  //   id
  //     plane id, the container of the children to create.
  //

  if (!this.isOpen(id)) {
    throw new Error('Plane does not exist: ' + id)
  }

  const plane = this.planes[id]
  const basis = plane.getBasis()

  const kernelChildren = this.kernel(id).children

  kernelChildren.forEach(child => {
    if (this.isAlive(child.id)) {
      // Node already exists. Skip.
      return
    }

    const node = this.createNode(child.id)
    const nodeBasis = basis.transformBy(child.transform, plane.at(0, 0))

    plane.addChild(node)
    node.setBasis(nodeBasis)

    // Register
    this.nodes[child.id] = node
  })
}
