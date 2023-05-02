const Box = require('../../geometry/Box')

module.exports = function () {
  // @Edge:getBoundingBox()
  //
  // Get the bounding box of the edge.
  //
  // Return:
  //   a Box
  //

  // Remember, the edge is always horizontal in its local basis.
  const box = {
    a: 1,
    b: 0,
    // Position. Match element top left corner.
    x: 0,
    y: 0,
    // The endpoint can be in the front or back.
    // If in the front, we must bring the box forward.
    z: Math.min(this.startpoint.z, this.endpoint.z),
    // Sizes.
    w: Math.abs(this.endpoint.x - this.startpoint.x),
    h: this.border.width,
    d: Math.abs(this.endpoint.z - this.startpoint.z)
  }

  return new Box(this, box)
}
