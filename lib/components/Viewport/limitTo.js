const affineplane = require('affineplane')
const circle2 = affineplane.circle2
const point2 = affineplane.point2
const dir2 = affineplane.dir2

module.exports = function (targets) {
  // @Viewport:limitTo(targets)
  //
  // Zoom until the targets are at least partly visible in the viewport.
  // Do not zoom at all if some of them are visible.
  // Useful for preventing users from getting lost in space.
  //
  // Parameters:
  //   targets
  //     array of Component
  //
  // Return
  //   this, for chaining
  //

  if (targets.length === 0) {
    return this
  }

  const viewOrigin = this.atAnchor().getRaw()
  const viewCircle = this.getBoundingCircle().getRaw()
  const dilationLimit = 0.02
  const minScale = dilationLimit
  const maxScale = 1 / dilationLimit

  const metrics = this.measureMany(targets)

  // Limit min max scale
  let scale = 1
  let origin = viewOrigin
  metrics.forEach((metric) => {
    // Limit by smallest
    if (metric.dilation * scale < minScale) {
      // Make larger
      scale = metric.dilation / minScale
      // Scale soon about this element
      origin = metric.target.atAnchor().transitRaw(this)
    } else if (metric.dilation * scale > maxScale) {
      // Make smaller
      scale = metric.dilation / maxScale
      origin = viewOrigin
    }
  })
  if (scale !== 1) {
    this.scaleBy(scale, origin)
  }

  const viewOut = metrics.every(m => !m.visible)
  if (viewOut) {
    // There was an outsider. Translate towards it all
    const circles = metrics.map(m => m.circle)
    const bounds = circle2.boundingCircle(circles)
    const gap = Math.max(0, circle2.gap(viewCircle, bounds))
    const dirVec = point2.vectorTo(viewCircle, bounds)
    const dir = dir2.fromVector(dirVec)
    const trip = dir2.toVector(dir, gap + viewCircle.r)

    this.translateBy(trip)
  }

  return this
}
