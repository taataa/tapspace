const Ray = require('../../geometry/Ray')

module.exports = function (point) {
  // @Viewport:findNearRay(point)
  /// TODO rename :findSolidsNearRay or option for filter
  //
  // Find item closest to a ray casted from the viewport camera towards
  // the given point. Exclude items behind camera.
  //
  // Return
  //   a FrameComponent, or null if space is empty
  //

  // Construct ray
  const camera = this.atCamera()
  const span = camera.getVectorTo(point)
  const ray = Ray.create(this, camera, span)

  // Only solid items that are somewhat away from the camera.
  const viewDepth = -camera.point.z
  const depthMin = viewDepth / 5 // TODO smells, maybe via options?
  const desc = this.hyperspace.getDescendants()
  const nodes = desc.filter(node => {
    return node.isItem && node.mass > 0 && this.measureDepth(node) > depthMin
  })
  const n = nodes.length

  // If space is empty
  if (n === 0) {
    return null
  }

  // TODO OPTIMIZE expose tensors to reduce duplicate transitions
  let minDist = Infinity
  let minItem = null
  for (let i = 0; i < n; i += 1) {
    const item = nodes[i]
    const d00 = ray.getDistanceToPoint(item.atNorm(0, 0)).transitRaw(this)
    const d01 = ray.getDistanceToPoint(item.atNorm(0, 1)).transitRaw(this)
    const d10 = ray.getDistanceToPoint(item.atNorm(1, 0)).transitRaw(this)
    const d11 = ray.getDistanceToPoint(item.atNorm(1, 1)).transitRaw(this)
    const dmid = ray.getDistanceToPoint(item.atMid()).transitRaw(this)
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
