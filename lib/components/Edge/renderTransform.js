const renderNormalTransform = require('./dom/renderNormalTransform')
const applyTransform2d = require('../Transformer/dom/applyTransform2d')
const point3 = require('affineplane').point3

module.exports = function () {
  // @Edge:renderTransform()
  //
  // Refresh the edge orientation.
  //

  if (this.isPlanar()) {
    // Planar 2D
    applyTransform2d(this.element, this.tran)
  } else {
    // True 3D.
    // Keep edge face up
    const attractor = point3.offset(this.startpoint, 0, 0, -1)
    // Alternative: keep edge face camera
    // const attractor = view.atCamera().transitRaw(this)
    renderNormalTransform(this, attractor)
  }
}
