const applyTransform2d = require('../TransformerComponent/dom/applyTransform2d')

module.exports = function () {
  // @Edge:renderTransform()
  //
  // Refresh the edge orientation.
  //

  // Planar 2D
  applyTransform2d(this.element, this.tran)
}
