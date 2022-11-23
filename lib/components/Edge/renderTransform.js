const renderTrackingTransform = require('./utils/renderTrackingTransform')
const renderOrthogonalTransform = require('./utils/renderOrthogonalTransform')

module.exports = function () {
  // tapspace.components.Edge:renderTransform()
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
