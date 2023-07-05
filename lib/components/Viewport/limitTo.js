const affineplane = require('affineplane')
const circle2 = affineplane.circle2
const point2 = affineplane.point2
const dir2 = affineplane.dir2

module.exports = function (targets, options) {
  // @Viewport:limitTo(targets[, options])
  //
  // Zoom until the targets are at least partly visible in the viewport.
  // Do not zoom at all if some of them are visible.
  // Useful for preventing users from getting lost in space.
  //
  // Parameters:
  //   targets
  //     array of Component
  //   options
  //     optional object with properties:
  //       maxAreaRatio
  //         optional number, default is 2.
  //         .. The largest allowed area of the *smallest* target
  //         .. relative to the viewport area. In other words,
  //         .. if the relative area of the smallest target grows
  //         .. above this maximum area ratio, viewport will zoom out.
  //       minAreaRatio
  //         optional number, default is 0.0002.
  //         .. The smallest allowed area of the *largest* target
  //         .. relative to the viewport area. In other words,
  //         .. if the relative area of the largest target shrinks
  //         .. below this minimum area ratio, viewport will zoom in.
  //
  // Return
  //   this, for chaining
  //

  // Nil targets, no limiting.
  if (!targets) {
    return this
  }

  // Normalize targets to array
  if (!Array.isArray(targets)) {
    targets = [targets]
  }

  // No targets, no limiting.
  if (targets.length === 0) {
    return this
  }

  // Default options
  if (!options) {
    options = {}
  }
  if (typeof options.maxAreaRatio !== 'number') {
    options.maxAreaRatio = 2
  }
  if (typeof options.minAreaRatio !== 'number') {
    options.minAreaRatio = 0.0002
  }

  // Measure targets
  const metrics = this.measureMany(targets)

  // If none are visible, bring some of the targets to view.
  const noneVisible = metrics.every(m => !m.visible)
  if (noneVisible) {
    // Compute bounding circle for the set of targets.
    const circles = metrics.map(m => m.circle)
    const targetsCircle = circle2.boundingCircle(circles)
    // Gap between the targets and viewport.
    const viewCircle = this.getBoundingCircle().getRaw()
    const gap = Math.max(0, circle2.gap(viewCircle, targetsCircle))
    // Construct a translation towards targets.
    const dirVec = point2.vectorTo(viewCircle, targetsCircle)
    const dir = dir2.fromVector(dirVec)
    const trip = dir2.toVector(dir, gap + viewCircle.r)
    // Apply
    this.translateBy(trip)
  }

  // Next, bring extreme sizes down to readable and reachable range.
  const MAX_AREA_RATIO = options.maxAreaRatio
  const MIN_AREA_RATIO = options.minAreaRatio
  let smallestAreaRatio = Infinity
  // let smallestTarget = null
  let largestAreaRatio = 0
  let largestTarget = null

  metrics.forEach(m => {
    if (m.areaRatio < smallestAreaRatio) {
      smallestAreaRatio = m.areaRatio
      // smallestTarget = m.target
    }
    if (m.areaRatio > largestAreaRatio) {
      largestAreaRatio = m.areaRatio
      largestTarget = m.target
    }
  })
  // Assert smallestTarget and largestTarget are set cuz num targets > 0

  let scaling = 1
  let origin = null
  if (smallestAreaRatio > MAX_AREA_RATIO) {
    // The smallest is too large.
    // Pick a scaling that shrinks the smallest to the limit.
    scaling = MAX_AREA_RATIO / smallestAreaRatio
    // Shrink about the viewport origin to bring the target back into view.
    origin = this.atAnchor()
  } else if (largestAreaRatio < MIN_AREA_RATIO) {
    // The largest is too small.
    // Pick a scaling that dilates the largest to the limit.
    scaling = MIN_AREA_RATIO / largestAreaRatio
    // Dilate about the target
    origin = largestTarget.atAnchor()
  }

  if (scaling !== 1) {
    this.hyperspace.scaleBy(scaling, origin).commit()
  }

  return this
}
