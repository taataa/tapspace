module.exports = (Edge) => {
  return (width) => {
    // tapspace.createEdge([width])
    // Edge.create
    //
    // Create an edge component. The edge is a straight line between
    // two points. Remember to set endpoints after adding the edge to space.
    //
    // Parameters: see Edge
    //
    // Return
    //   an Edge
    //
    return new Edge(width)
  }
}
