const fine = require('affineplane')
const box2 = fine.box2
const point2 = fine.point2

module.exports = function (point) {
  // @Viewport:findNearestProjected(point)
  //
  // Find item closest to the point after all the item boxes and the point
  // are projected onto the viewport.
  //
  // Parameters:
  //   point
  //     a Point
  //
  // Return
  //   a FrameComponent, or null if the space is empty
  //

  // Find the point on the viewport
  const camera = this.atCamera()
  const pointOnView = point.projectTo(this, camera).getRaw()

  // Limit the set of items to project.
  const desc = this.hyperspace.getDescendants()
  const nodes = desc.filter(node => {
    if (node.isItem) {
      // Cut items behind camera
      const depth = this.measureDepth(node)
      if (depth > 0) {
        // Cut too large items.
        const dilation = this.measureDilation(node)
        return dilation < node.mass
      }
    }
    return false
  })
  const n = nodes.length

  // If space is empty
  if (n === 0) {
    return null
  }

  let minDist = Infinity
  let minItem = null
  for (let i = 0; i < n; i += 1) {
    const item = nodes[i]
    const box = item.getBoundingBox().projectTo(this, camera).box
    // Assert raw box on the viewport.
    // Test corners.
    const d00 = point2.distance(pointOnView, box2.atNorm(box, 0, 0))
    const d01 = point2.distance(pointOnView, box2.atNorm(box, 0, 1))
    const d10 = point2.distance(pointOnView, box2.atNorm(box, 1, 0))
    const d11 = point2.distance(pointOnView, box2.atNorm(box, 1, 1))
    const dmid = point2.distance(pointOnView, box2.atNorm(box, 0.5, 0.5))
    const mind = Math.min(d00, d01, d10, d11, dmid)
    if (mind < minDist) {
      minDist = mind
      minItem = item
      if (minDist === 0) {
        // Zero distance: cannot find better thus exit early.
        return minItem
      }
    }
  }

  return minItem
}
