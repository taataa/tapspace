const AffineEdge = require('./index')

module.exports = (border, options) => {
  // tapspace.edge(border, opts)
  //
  // Create an Edge component. The edge is a straight line between
  // two points.
  //
  // Parameters: see tapspace.components.Edge
  //
  // Return
  //   a tapspace.components.Edge
  //
  return new AffineEdge(border, options)
}
