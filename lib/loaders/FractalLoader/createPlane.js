const Plane = require('../../components/Plane')

module.exports = function (id) {
  // Create a plane.
  //
  // Parameters:
  //   id
  //     a plane identifier.
  //
  // Return
  //   a Plane
  //

  // Ensure plane does not exist
  if (id in this.planes) {
    return this.planes[id]
  }

  // Ensure node exists
  if (!this.isAlive(id)) {
    throw new Error('Cannot open plane for non-existing node.')
  }

  const nodeBasis = this.nodes[id].getBasis()
  const helmert = this.kernel(id).plane.transform
  const planeBasis = nodeBasis.transformBy(helmert, nodeBasis.at(0, 0))

  const plane = Plane.create()
  this.viewport.addChild(plane)

  plane.setBasis(planeBasis)

  // Register
  this.planes[id] = plane

  return plane
}
