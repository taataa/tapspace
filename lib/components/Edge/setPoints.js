module.exports = function (startPoint, endPoint) {
  // tapspace.Edge:setPoints(startPoint, endPoint)
  //
  // Set edge start and end points.
  // Note that this does not scale the edge.
  //
  // Parameters:
  //   startPoint
  //     a Point
  //   endPoint
  //     a Point
  //
  // Return
  //   this, for chaining
  //

  // First, find new length
  let dist = startPoint.getDistanceTo(endPoint)
  // Normalise on the edge
  dist = dist.changeBasis(this)
  // Set the new length
  const len = dist.dist
  const size = { w: len, h: this.border.width }
  this.setSize(size)

  // Move the edge plane to the startPoint
  this.translateTo(startPoint)

  // Find the end point on the edge plane. The plane is parallel with view.
  this.endpoint = endPoint.transitRaw(this)

  // HACK renderer adjusts the plane transition according to the endpoints.
  this.renderTransform()

  // DOC 2D renderer could use match() to rotate and translate
  // DOC the edge plane to match the points.

  // // Find new endpoints on the edge layer.
  // // No need to use Point for match.
  // const start = { x: 0, y: size.h / 2 }
  // const end = { x: len, y: size.h / 2 }
  // // Move the edge so that the endpoints match the given points.
  // this.match({
  //   sources: [start, end],
  //   targets: [startPoint, endPoint],
  //   estimator: 'TR'
  // })

  return this
}
