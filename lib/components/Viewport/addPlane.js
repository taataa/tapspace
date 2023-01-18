const Plane = require('../Plane')

module.exports = function (position) {
  // @Viewport:addPlane(position)
  //
  // Create a Plane, add, and render it.
  // The Plane will be appear in the viewport hyperspace at the given
  // position.
  //
  // Example:
  // ```
  // const nodeplane = view.addPlane(view.atCenter())
  // nodeplane.addChild(tapspace.createItem('Hello'))
  // ```
  //
  // Parameters:
  //   position
  //     optional Point
  //
  // Return
  //   a Plane, the created plane.
  //
  const p = new Plane()

  this.addChild(p, position)

  return p
}
