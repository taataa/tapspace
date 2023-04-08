// Hiding and opening logic
const MIN_AREA = 0.001 // smallest item
const MIN_OPEN_AREA = 0.01 // closed items smaller than this
const MAX_OPEN_AREA = 1 // closed items larger than this
const MAX_AREA = 2 // largest item
const MAX_OPEN_DISTANCE = 1000
const MAX_DISTANCE = 1600

module.exports = function () {
  // Update the fractal. Open, close and remove nodes.
  //

  const nodesToOpen = []
  const nodesToClose = []
  const nodesToRetire = []
  const nodesToRemove = []
  const nodesToReunite = []

  // TODO allow measureAll to take a filter.
  const measures = this.viewport.measureAll().filter((measure) => {
    const node = measure.plane
    const hasFractalId = typeof node.fractalId !== 'undefined'
    return hasFractalId
  })

  const self = this
  measures.forEach(measure => {
    const node = measure.plane
    const id = node.fractalId

    // Normalized area per viewport area
    const area = measure.areaRatio
    // Distance from camera
    const dist = measure.distancePx
    // Is visible
    const visible = measure.visible

    if (self.isNodeOpen(id)) {
      if (visible) {
        // Node is open and within viewport
        if (area < MIN_AREA) {
          // Too far away, remove it and its children.
          nodesToRemove.push(id)
        } else if (area < MIN_OPEN_AREA) {
          // Far away, close the node
          nodesToClose.push(id)
          // Ensure parent exists
          nodesToReunite.push(id)
        } else if (area < MAX_OPEN_AREA) {
          // Keep open. Ensure parent exists.
          nodesToReunite.push(id)
        } else if (area < MAX_AREA) {
          // Large. Keep open.
        } else {
          // Too large. Remove but keep children.
          // nodesToRetire.push(fractalNode)
        }
      } else {
        // Node is open but outside viewport.
        if (dist < MAX_OPEN_DISTANCE) {
          // Keep open
        } else if (dist < MAX_DISTANCE) {
          // Keep open
        } else {
          nodesToRetire.push(id)
        }
      }
    } else {
      // Is closed, no children.
      if (visible) {
        // Node is closed and within viewport
        if (area < MIN_AREA) {
          // Too small, remove it and children
          nodesToRemove.push(id)
        } else if (area < MIN_OPEN_AREA) {
          // Keep closed, ensure parent exists
          nodesToReunite.push(id)
        } else if (area < MAX_OPEN_AREA) {
          // Ensure parent exists
          nodesToOpen.push(id)
          nodesToReunite.push(id)
        } else if (area < MAX_AREA) {
          // Keep open
          nodesToOpen.push(id)
        } else {
          // Too large. Remove but keep children.
          // nodesToRetire.push(fractalNode)
        }
      } else {
        // Node is closed and outside viewport.
        if (dist < MAX_OPEN_DISTANCE) {
          // Keep closed
        } else if (dist < MAX_DISTANCE) {
          // Keep closed
        } else {
          nodesToRetire.push(id)
        }
      }
    }
  })

  nodesToOpen.forEach((id) => {
    self.openChildren(id)
  })

  nodesToReunite.forEach((id) => {
    self.reuniteNode(id)
  })

  nodesToRetire.forEach((id) => {
    self.retireNode(id)
  })

  nodesToClose.forEach((id) => {
    self.closeNode(id)
  })

  nodesToRemove.forEach((id) => {
    self.removeNode(id)
  })
}
