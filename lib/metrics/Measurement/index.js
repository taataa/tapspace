const fine = require('affineplane')
const box2 = fine.box2
const box3 = fine.box3
const plane3 = fine.plane3
const point3 = fine.point3
const sphere2 = fine.sphere2
const sphere3 = fine.sphere3
const vec3 = fine.vec3

const Measurement = function (node, basis, camera, viewSphere, viewArea) {
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
  //   camera
  //     a point3, the camera position, relative to the viewport.
  //   viewportSphere
  //     a sphere3, the viewport boundary
  //   viewportArea
  //     a number, the viewport area
  //
  // Properties:
  //   target, the measured element
  //   areaPx, the element area in viewport square pixels.
  //   areaRatio, the element area relative to the viewport area.
  //   depthOnCamera, is the target depth to camera in viewport pixels.
  //   depthOnViewport, a number, in viewport pixels.
  //   dilation, a number, the scaling factor, pxOnView per pxOnLocal.
  //   distanceToCamera, a distance to camera represented in viewport pixels.
  //   distanceToViewport, a number, in viewport pixels.
  //   visible, boolean and true if the element or parts of it are
  //   .. visibly within the viewport or approximately close of being visible.

  // Distances
  const cameraToImageDepth = viewSphere.z - camera.z
  const anchorOnView = point3.transitFrom(node.anchor, basis)
  const cameraToNode = point3.diff(camera, anchorOnView)
  const imageToNode = point3.diff(viewSphere, anchorOnView)
  const cameraDistPx = vec3.norm(cameraToNode)
  const cameraDepthPx = cameraToNode.z
  const imageDistPx = vec3.norm(imageToNode)
  const imageDepthPx = imageToNode.z

  // Compute sizes and areas
  let areaPx, areaRatio, dilation
  if (cameraDepthPx <= 0) {
    // Target behind camera
    areaPx = Infinity
    areaRatio = Infinity
    dilation = Infinity
  } else {
    // Target front of camera.
    const box = node.getBoundingBox() // TODO can be comput. intensive.
    const boxOnView = box3.transitFrom(box.box, basis)
    const boxProjOnView = box3.projectTo(boxOnView, plane3.IDENTITY, camera)
    areaPx = box2.getArea(boxProjOnView)
    areaRatio = areaPx / viewArea
    dilation = plane3.getScale(basis) * (cameraToImageDepth / cameraDepthPx)
  }

  // Collisions with viewport
  let visibleInView = false
  if (cameraDepthPx > 0) {
    const sphere = node.getBoundingSphere() // TODO can be comput. intensive.
    const sphereOnView = sphere3.transitFrom(sphere.sphere, basis)
    const sphereProjOnView = sphere3.projectTo(sphereOnView, plane3.IDENTITY,
      camera)
    visibleInView = sphere2.collide(sphereProjOnView, viewSphere)
  }

  // Construct
  this.plane = node // TODO DEPRECATE
  this.target = node
  this.areaPx = areaPx
  this.areaRatio = areaRatio
  this.depthOnCamera = cameraDepthPx
  this.depthOnViewport = imageDepthPx
  this.dilation = dilation
  this.distanceToCamera = cameraDistPx
  this.distanceToViewport = imageDistPx
  this.visible = visibleInView
}

module.exports = Measurement
