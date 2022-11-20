const AffineEdge = require('./index')

module.exports = (border) => {
  // tapspace.createEdge(border)
  // tapspace.edge
  //
  // Create an Edge component. The edge is a straight line between
  // two points. Set points after adding the edge to basis.
  //
  // Parameters: see tapspace.components.Edge
  //
  // Return
  //   a tapspace.components.Edge
  //
  return new AffineEdge(border)
}
