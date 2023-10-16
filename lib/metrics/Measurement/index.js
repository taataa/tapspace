const fine = require('affineplane')
const box2 = fine.box2
const box3 = fine.box3
const plane3 = fine.plane3
const point3 = fine.point3
const circle2 = fine.circle2
const circle3 = fine.circle3
const vec3 = fine.vec3

const Measurement = function (node, basis, viewCircle, viewArea) {
  // @Measurement(node, basis, camera, viewportCircle, viewportArea)
  //
  // A measurement provides geometric information about the node based on
  // the given viewport properties.
  //
  // Parameters:
  //   node
  //     a space element, component
  //   basis
  //     a plane3, relative to the viewport
  //   viewportCircle
  //     a circle3, the viewport boundary
  //   viewportArea
  //     a number, the viewport area
  //
  // Properties:
  //   target, the measured element
  //   connected, boolean true if in same space and measurable.
  //   areaPx, the element rectangle area in viewport square pixels.
  //   areaRatio, the element area relative to the viewport area.
  //   areaVisible, the visible portion of the element area. In square px.
  //   circle, a {x,y,r} object, bounding circle on the viewport.
  //   dilation, a number, the scaling factor, pxOnView per pxOnLocal.
  //   distanceToViewport, a number, in viewport pixels.
  //   visible, boolean and true if the element or parts of it are
  //   .. visibly within the viewport or approximately close of being visible.
  //   visualDistance, a heuristic for how well the object is showing.
  //

  // Handle disconnected
  if (!basis) {
    this.target = node
    this.connected = false
    this.areaPx = 0
    this.areaRatio = 0
    this.areaVisible = 0
    this.circle = null
    this.dilation = 0
    this.distanceToViewport = Infinity
    this.visible = false
    this.visualDistance = Infinity
    return
  }

  // Distances
  const anchorOnView = point3.transitFrom(node.anchor, basis)
  const imageToNode = point3.diff(viewCircle, anchorOnView)
  const imageDistPx = vec3.norm(imageToNode)

  // Compute sizes and areas
  const box = node.getBoundingBox() // TODO can be comput. intensive.
  const boxOnView = box3.transitFrom(box.box, basis)
  const boxAreaPx = box2.getArea(boxOnView)
  const boxAreaRatio = boxAreaPx / viewArea
  const dilation = plane3.getScale(basis)

  // Collisions with viewport
  const circle = node.getBoundingCircle() // TODO can be comput. intensive.
  const circleOnView = circle3.transitFrom(circle.circle, basis)
  const circleArea = (Math.PI * circleOnView.r * circleOnView.r)
  // Approximate box area with circle overlap
  const areaVisible = circle2.collisionArea(circleOnView, viewCircle)
  const visibleInView = areaVisible > 0
  const boxAreaVisible = areaVisible * boxAreaPx / circleArea

  // Construct
  this.target = node
  this.connected = true
  // Reference
  this.viewportDiameter = viewCircle.r * 2
  // Dimensions
  this.areaPx = boxAreaPx
  this.areaRatio = boxAreaRatio
  this.areaVisible = boxAreaVisible
  this.circle = circleOnView
  this.dilation = dilation
  this.distanceToViewport = imageDistPx
  this.visible = visibleInView
}

module.exports = Measurement
const proto = Measurement.prototype

proto.getVisualDistance = require('./getVisualDistance')
