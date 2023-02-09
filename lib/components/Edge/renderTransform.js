const renderNormalTransform = require('./dom/renderNormalTransform')
const applyTransform2d = require('../Transformer/dom/applyTransform2d')
const point3 = require('affineplane').point3

module.exports = function () {
  // @Edge:renderTransform()
  //
  // Refresh the edge orientation.
  //

  // TODO maybe each node should carry reference to its space?
  // TODO or maybe we do not need to know if the view is perspective?
  const view = this.getRoot()

  if (view.isPerspective()) {
    // Keep edge face up
    const attractor = point3.offset(this.startpoint, 0, 0, -1)
    renderNormalTransform(this, attractor)
    // Alternative: keep edge face camera
    // const attractor = view.atCamera().transitRaw(this)
  } else {
    // Planar 2D
    applyTransform2d(this.element, this.tran)
  }
}
