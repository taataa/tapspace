const fine = require('affineplane')
const box2 = fine.box2
const box3 = fine.box3
const plane3 = fine.plane3
const point3 = fine.point3
const sphere2 = fine.sphere2
const sphere3 = fine.sphere3
const vec3 = fine.vec3
const Distance = require('../../geometry/Distance')
const Vector = require('../../geometry/Vector')

module.exports = function () {
  // @Viewport:measurePlanes()
  //
  // Find distances to all planes that belong to the viewport.
  //
  // Example:
  // ```
  // const measures = view.measurePlanes()
  // ```
  //
  // Returns:
  //   an array of Measure. Each measure is an object with properties:
  //   - plane, the measured element
  //   - areaPx, the element area in viewport square pixels.
  //   - areaRatio, the element area relative to the viewport area.
  //   - distance, is a Distance between viewport anchor and the plane anchor.
  //   - distancePx, is the distance represented in viewport pixels.
  //   - depthPx, is the target depth represented in viewport pixels.
  //   - vector, is a Vector from the viewport anchor to the plane anchor.
  //   - visible, boolean and true if the element or parts of it are
  //     .. visibly within the viewport or approximately close of being visible.
  //
  // Complexity:
  //   O(n) where n is the number of nodes in the spaces.
  //

  // Precompute viewport values
  const cameraOnViewport = this.atCamera().getRaw()
  // const viewportBox = this.getBoundingBox().getRaw()
  const viewportSphere = this.getBoundingSphere().getRaw()
  const viewportArea = this.getArea().getRaw()

  // We track the full basis. Array of { node, basis }. Begin on space.
  const stack = [{
    node: this.hyperspace,
    basis: this.hyperspace.tran
  }]

  // Collect measures to return
  const measures = []

  for (let i = 0; i < stack.length; i += 1) {
    // Note that stack grows during iteration.

    // Extract
    const stackItem = stack[i]
    const basis = stackItem.basis
    const node = stackItem.node

    // Measure this node on this basis.
    // Skip nodes without anchor.
    if (node.anchor) {
      // Distances
      const anchorOnViewport = point3.transitFrom(node.anchor, basis)
      const delta = point3.diff(cameraOnViewport, anchorOnViewport)
      const distPx = vec3.norm(delta)
      // Sizes and areas
      const box = node.getBoundingBox() // TODO can be comput. intensive.
      const boxOnViewport = box3.transitFrom(box.box, basis)
      const boxProjOnView = box3.projectTo(boxOnViewport, plane3.IDENTITY,
        cameraOnViewport)
      const areaPx = box2.getArea(boxProjOnView)
      // Relative areas
      const areaRatio = areaPx / viewportArea
      // Collisions with viewport
      const sphere = node.getBoundingSphere()
      const sphereOnView = sphere3.transitFrom(sphere.sphere, basis)
      const sphereProjOnView = sphere3.projectTo(sphereOnView, plane3.IDENTITY,
        cameraOnViewport)
      const visibleInView = sphere2.collide(sphereProjOnView, viewportSphere)
      // Construct
      measures.push({
        plane: node,
        distance: new Distance(this, distPx),
        distancePx: distPx,
        vector: new Vector(this, delta),
        depthPx: delta.z,
        areaPx: areaPx,
        areaRatio: areaRatio,
        visible: visibleInView
      })
    }

    // Add children to stack. Compute bases.
    const kids = node.getChildren()
    for (let j = 0; j < kids.length; j += 1) {
      stack.push({
        node: kids[j],
        basis: plane3.compose(basis, kids[j].tran)
      })
    }

    // Then next child
  }

  return measures
}
