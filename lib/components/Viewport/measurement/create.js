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

module.exports = (node, basis, camera, viewSphere, viewArea) => {
  // Helper function for measuring.
  //
  // Parameters:
  //   node
  //     a space element
  //   basis
  //     a plane3 relative to the viewport
  //   camera
  //     a point3, the camera position
  //   viewSphere
  //     a sphere3, the viewport boundary
  //   viewArea
  //     a number, the viewport area
  //
  // Return
  //   a measurement

  // Distances
  const anchorOnView = point3.transitFrom(node.anchor, basis)
  const delta = point3.diff(camera, anchorOnView)
  const distPx = vec3.norm(delta)

  // Sizes and areas
  const box = node.getBoundingBox() // TODO can be comput. intensive.
  const boxOnView = box3.transitFrom(box.box, basis)
  const boxProjOnView = box3.projectTo(boxOnView, plane3.IDENTITY, camera)
  const areaPx = box2.getArea(boxProjOnView)

  // Relative areas
  const areaRatio = areaPx / viewArea

  // Collisions with viewport
  const sphere = node.getBoundingSphere() // TODO can be comput. intensive.
  const sphereOnView = sphere3.transitFrom(sphere.sphere, basis)
  const sphereProjOnView = sphere3.projectTo(sphereOnView, plane3.IDENTITY,
    camera)
  const visibleInView = sphere2.collide(sphereProjOnView, viewSphere)

  // Construct
  return {
    plane: node,
    distance: new Distance(this, distPx),
    distancePx: distPx,
    vector: new Vector(this, delta),
    depthPx: delta.z,
    areaPx: areaPx,
    areaRatio: areaRatio,
    visible: visibleInView
  }
}
