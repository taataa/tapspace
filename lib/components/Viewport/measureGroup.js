const fine = require('affineplane')
const plane3 = fine.plane3
const Measurement = require('../../metrics/Measurement')

module.exports = function (group) {
  // @Viewport:measureGroup(group)
  //
  // Find distances, projected areas, and visibility data for the group
  // and all the components within.
  //
  // Example:
  // ```
  // const measures = view.measureGroup(space)
  // ```
  //
  // Returns:
  //   an array of Measure. Each measure is an object with properties:
  //   - target, the measured element
  //   - areaPx, the element area in viewport square pixels.
  //   - areaRatio, the element area relative to the viewport area.
  //   - distancePx, is the distance represented in viewport pixels.
  //   - depthPx, is the target depth represented in viewport pixels.
  //   - visible, boolean and true if the element or parts of it are
  //     .. visibly within the viewport or approximately close of being visible.
  //
  // Complexity:
  //   O(n) where n is the number of nodes in the group.
  //

  // Precompute viewport values
  const cameraOnViewport = this.atCamera().getRaw()
  const viewportSphere = this.getBoundingSphere().getRaw()
  const viewportArea = this.getArea().getRaw()

  // We track the full basis. Array of { node, basis }. Begin on the group.
  const stack = [{
    node: group,
    basis: group.getTransitionTo(this)
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
      const meas = new Measurement(node, basis, cameraOnViewport,
        viewportSphere, viewportArea)
      measures.push(meas)
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
