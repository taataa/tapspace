const Plane = require('../../components/Plane')

module.exports = function (id) {
  // Create initial node. Assume fractal is empty.
  //

  const plane = Plane.create()
  this.viewport.addChild(plane, this.viewport.atCenter())

  const initialParentId = this.backtracker(id)
  if (initialParentId === null) {
    // Initial is the root.
    this.planes.ROOTPLANE = plane
    // Create node
    const node = this.generator(id)
    node.fractalId = id
    plane.addChild(node)
    this.nodes[id] = node
  } else {
    this.planes[initialParentId] = plane
    this.populatePlane(initialParentId)
  }
}
