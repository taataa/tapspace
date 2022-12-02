const renderTrackingTransform = require('./dom/renderTrackingTransform')
const renderOrthogonalTransform = require('./dom/renderOrthogonalTransform')

module.exports = function () {
  // @Edge:renderTransform()
  //
  // Refresh the edge orientation.
  //

  // TODO maybe each node should carry reference to its space?
  const view = this.getRoot()

  if (view.isPerspective()) {
    renderTrackingTransform(this, view)
  } else {
    renderOrthogonalTransform(this)
    // renderOrthogonalTransform(this)
  }
}
