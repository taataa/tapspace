module.exports = (Edge) => {
  return (border) => {
    // tapspace.createEdge(border)
    // Edge.create
    //
    // Create an edge component. The edge is a straight line between
    // two points. Set points after adding the edge to basis.
    //
    // Parameters: see Edge
    //
    // Return
    //   an Edge
    //
    return new Edge(border)
  }
}
