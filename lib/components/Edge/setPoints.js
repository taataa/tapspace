const fine = require('affineplane')
const point2 = fine.point2
const point3 = fine.point3
const vec2 = fine.vec2

module.exports = function (startPoint, endPoint) {
  // @Edge:setPoints(startPoint, endPoint)
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

  // Normalize on the edge. The edge can translate and rotate but
  // let us get the distance and depth.
  if (startPoint.transitRaw) {
    startPoint = startPoint.transitRaw(this)
  }
  if (endPoint.transitRaw) {
    endPoint = endPoint.transitRaw(this)
  }

  // Find length for the element.
  const width = point3.distance(startPoint, endPoint)
  // Find edge height
  const height = this.border.width
  // Set the element size.
  const size = { w: width, h: height }
  this.setSize(size)

  const dx = vec2.norm(point2.difference(endPoint, startPoint))
  const dz = endPoint.z - startPoint.z

  // Set horizontal endpoints.
  this.startpoint = { x: 0, y: 0, z: 0 } // TODO probably not necessary?
  this.endpoint = { x: dx, y: 0, z: dz }

  // Use match() to rotate and translate the edge plane to match the points.
  // Find new endpoints on the edge layer.
  const rectStart = { x: 0, y: height / 2, z: 0 }
  const rectEnd = { x: dx, y: height / 2, z: 0 }
  // Move the edge so that the endpoints match the given points.
  endPoint.z = startPoint.z // HACK make match() do the dz translation
  this.match({
    sources: [rectStart, rectEnd],
    targets: [startPoint, endPoint],
    estimator: 'TR'
  })

  return this
}
