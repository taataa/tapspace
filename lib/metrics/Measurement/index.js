const fine = require('affineplane')
const box2 = fine.box2
const box3 = fine.box3
const plane3 = fine.plane3
const point3 = fine.point3
const sphere2 = fine.sphere2
const sphere3 = fine.sphere3
const vec3 = fine.vec3

const Measurement = function (node, basis, viewSphere, viewArea) {
  // @Measurement(node, basis, camera, viewportSphere, viewportArea)
  //
  // A measurement provides geometric information about the node based on
  // the given viewport properties.
  //
  // Parameters:
  //   node
  //     a space element, component
  //   basis
  //     a plane3, relative to the viewport
  //   viewportSphere
  //     a sphere3, the viewport boundary
  //   viewportArea
  //     a number, the viewport area
  //
  // Properties:
  //   target, the measured element
  //   areaPx, the element area in viewport square pixels.
  //   areaRatio, the element area relative to the viewport area.
  //   circle, a {x,y,r} object, bounding sphere on the viewport.
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
    this.circle = null
    this.dilation = 0
    this.distanceToViewport = Infinity
    this.visible = false
    this.visualDistance = Infinity
    return
  }

  // Distances
  const anchorOnView = point3.transitFrom(node.anchor, basis)
  const imageToNode = point3.diff(viewSphere, anchorOnView)
  const imageDistPx = vec3.norm(imageToNode)

  // Compute sizes and areas
  const box = node.getBoundingBox() // TODO can be comput. intensive.
  const boxOnView = box3.transitFrom(box.box, basis)
  const areaPx = box2.getArea(boxOnView)
  const areaRatio = areaPx / viewArea
  const dilation = plane3.getScale(basis)

  // Collisions with viewport
  const sphere = node.getBoundingCircle() // TODO can be comput. intensive.
  const sphereOnView = sphere3.transitFrom(sphere.sphere, basis)
  const visibleInView = sphere2.collide(sphereOnView, viewSphere)

  // Visual, virtual distance
  const dz = viewSphere.r / dilation
  const visualDistance = Math.sqrt(imageDistPx * imageDistPx + dz * dz)

  // Construct
  this.target = node
  this.connected = true
  // Dimensions
  this.areaPx = areaPx
  this.areaRatio = areaRatio
  this.circle = sphereOnView
  this.dilation = dilation
  this.distanceToViewport = imageDistPx
  this.visible = visibleInView
  this.visualDistance = visualDistance
}

module.exports = Measurement
