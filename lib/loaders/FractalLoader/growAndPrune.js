module.exports = function () {
  // Update the fractal. Evolve. Open, close and remove nodes.
  // This function defines the hiding logic.
  //

  const MIN_AREA = this.limits.minVisibleCover
  const MIN_OPEN_AREA = this.limits.minOpenCover
  const MAX_OPEN_AREA = this.limits.maxOpenCover
  const MAX_AREA = this.limits.maxVisibleCover
  const MAX_DISTANCE = this.limits.maxDistance

  // Gather node ids before operations.
  // Use dictionary instead of array to reduce duplicates.
  const nodesToOpen = {}
  const nodesToClose = {}
  const nodesToRetire = {}
  const nodesToRemove = {}
  const nodesToReunite = {}

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

    if (!id) {
      console.error('Missing fractalId ' + id)
      return
    }

    // Normalized area per viewport area
    const area = measure.areaRatio
    // Distance from camera
    const dist = measure.distanceToCamera
    // Is visible
    const visible = measure.visible

    if (visible) {
      // Node is open and within viewport
      if (area < MIN_AREA) {
        // Too far away, remove it and its children.
        nodesToRemove[id] = true
      } else if (area < MIN_OPEN_AREA) {
        // Far away, close the node
        nodesToClose[id] = true
        // Ensure parent exists
        nodesToReunite[id] = true
      } else if (area < MAX_OPEN_AREA) {
        // Keep open. Ensure parent exists.
        nodesToOpen[id] = true
      } else if (area < MAX_AREA) {
        // Large. Keep open.
      } else {
        // Too large. Remove but keep children.
        nodesToRetire[id] = true
      }
    } else {
      // Node is outside viewport. Reduce visibility.
      if (area < MIN_AREA) {
        // Too far away.
        nodesToRemove[id] = true
      } else if (dist > MAX_DISTANCE) {
        nodesToRetire[id] = true
      }
    }
  })

  Object.keys(nodesToOpen).forEach((id) => {
    console.log('open', id)
    self.openParent(id)
    self.openSiblings(id)
    self.openChildren(id)
    // Safeguards
    delete nodesToReunite[id]
    delete nodesToRetire[id]
    delete nodesToClose[id]
    delete nodesToRemove[id]
  })

  Object.keys(nodesToReunite).forEach((id) => {
    console.log('reunite', id)
    self.openParent(id)
    self.openSiblings(id)
    // Safeguards
    delete nodesToRetire[id]
    delete nodesToClose[id]
    delete nodesToRemove[id]
  })

  Object.keys(nodesToRetire).forEach((id) => {
    console.log('retire', id)
    self.retireNode(id)
    // Safeguards
    delete nodesToClose[id]
    delete nodesToRemove[id]
  })

  Object.keys(nodesToClose).forEach((id) => {
    console.log('close', id)
    self.closeNode(id)
    // Safeguards
    delete nodesToRemove[id]
  })

  Object.keys(nodesToRemove).forEach((id) => {
    console.log('remove', id)
    self.removeNode(id)
  })
}
