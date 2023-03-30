const fine = require('affineplane')
const box2 = fine.box2
const box3 = fine.box3
const plane3 = fine.plane3
const point3 = fine.point3
const sphere2 = fine.sphere2
const sphere3 = fine.sphere3
const vec3 = fine.vec3
const Distance = require('../../../geometry/Distance')
const Vector = require('../../../geometry/Vector')

module.exports = (node, basis, camera, viewportSphere, viewportArea) => {
  // Helper function for measuring.
  //
  // Parameters:
  //   node
  //     a space element
  //   basis
  //     a plane3 relative to the viewport
  //   camera
  //     a point3, the camera position
  //   viewportSphere
  //     a sphere3, the viewport boundary
  //   viewportArea
  //     a number, the viewport area
  //
  // Return
  //   a measurement

  // Distances
  const anchorOnView = point3.transitFrom(node.anchor, basis)
  const cameraToNode = point3.diff(camera, anchorOnView)
  const imageToNode = point3.diff(viewportSphere, anchorOnView)
  const cameraDistPx = vec3.norm(cameraToNode)
  const cameraDepthPx = cameraToNode.z
  const imageDistPx = vec3.norm(imageToNode)
  const imageDepthPx = imageToNode.z

  // Compute sizes and areas
  let areaPx, areaRatio
  if (cameraDepthPx <= 0) {
    // Target behind camera
    areaPx = Infinity
    areaRatio = Infinity
  } else {
    // Target front of camera.
    const box = node.getBoundingBox() // TODO can be comput. intensive.
    const boxOnView = box3.transitFrom(box.box, basis)
    const boxProjOnView = box3.projectTo(boxOnView, plane3.IDENTITY, camera)
    areaPx = box2.getArea(boxProjOnView)
    areaRatio = areaPx / viewportArea
  }

  // Collisions with viewport
  let visibleInView = false
  if (cameraDepthPx > 0) {
    const sphere = node.getBoundingSphere() // TODO can be comput. intensive.
    const sphereOnView = sphere3.transitFrom(sphere.sphere, basis)
    const sphereProjOnView = sphere3.projectTo(sphereOnView, plane3.IDENTITY,
      camera)
    visibleInView = sphere2.collide(sphereProjOnView, viewportSphere)
  }

  // Construct
  return {
    plane: node,
    distance: new Distance(this, cameraDistPx),
    distancePx: cameraDistPx,
    vector: new Vector(this, cameraToNode),
    depthPx: cameraDepthPx,
    areaPx: areaPx,
    areaRatio: areaRatio,
    visible: visibleInView
  }
}
