const fine = require('affineplane')
const plane3 = fine.plane3
const Measurement = require('../../metrics/Measurement')

module.exports = function (group, filter) {
  // @Viewport:measureGroup(group[, filter])
  //
  // Find distances, projected areas, and visibility data for the group
  // and all the components within.
  //
  // Example:
  // ```
  // const measurements = view.measureGroup(space)
  // ```
  //
  // Parameters:
  //   group
  //     a Space or Plane
  //   filter
  //     a function (comp) => boolean. Limit components to measure.
  //
  // Returns:
  //   an array of Measurement
  //
  // Complexity:
  //   O(n) where n is the number of nodes in the group.
  //

  // Precompute viewport values
  const viewportCircle = this.getBoundingCircle().getRaw()
  const viewportArea = this.getArea().getRaw()

  // We track the full basis. Array of { node, basis }. Begin on the group.
  const stack = [{
    node: group,
    basis: group.getTransitionTo(this)
  }]

  // Grow stack and compute bases step-by-step manner.
  for (let i = 0; i < stack.length; i += 1) {
    // Extract
    const stackItem = stack[i]
    const basis = stackItem.basis
    const node = stackItem.node

    // Add children to stack. Compute bases.
    const kids = node.getChildren()
    for (let j = 0; j < kids.length; j += 1) {
      stack.push({
        node: kids[j],
        basis: plane3.compose(basis, kids[j].tran)
      })
    }
  }

  // Select filter.
  // Ensure that each components to measure has anchor.
  let stackFilter
  if (typeof filter === 'function') {
    stackFilter = (stackItem) => {
      return stackItem.node.isTransformer && filter(stackItem.node)
    }
  } else {
    stackFilter = (stackItem) => {
      return stackItem.node.isTransformer
    }
  }

  // Collect measures to return
  const measures = stack.filter(stackFilter).map((stackItem) => {
    return new Measurement(
      stackItem.node,
      stackItem.basis,
      viewportCircle,
      viewportArea
    )
  })

  return measures
}
