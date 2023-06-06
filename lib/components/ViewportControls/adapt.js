const fine = require('affineplane')
const point2 = fine.point2

module.exports = function (resizeEvent) {
  // @ViewportControls:adapt(resizeEvent)
  //
  // This method receives a ResizeEvent from the ResizeCapturer
  // and adjusts the controls so that they stay at the same distance
  // from their associated corner of the viewport.
  // Useful when the viewport size changes.
  //
  // Parameters:
  //   resizeEvent
  //     an object
  //
  // Return
  //   this, for chaining
  //

  const controls = this.getChildren()
  const viewport = this.getViewport()

  const oldSize = resizeEvent.previousSize.transitRaw(viewport)
  const newSize = resizeEvent.size.transitRaw(viewport)

  // For each control, measure distance from each component corner
  // to each viewport corner.

  // Size-relative hooking points.
  const relPoints = [
    { rx: 0, ry: 0 },
    { rx: 0, ry: 0.5 },
    { rx: 0, ry: 1 },
    { rx: 0.5, ry: 0 },
    { rx: 1, ry: 0 },
    { rx: 0.5, ry: 1 },
    { rx: 1, ry: 0.5 },
    { rx: 1, ry: 1 }
  ]

  controls.forEach(comp => {
    // Find nearest matching hooking point.
    const finding = relPoints.reduce((acc, rp) => {
      const rx = rp.rx
      const ry = rp.ry
      const controlCorner = comp.atNorm(rx, ry).transitRaw(viewport)
      const viewCorner = { x: oldSize.w * rx, y: oldSize.h * ry }

      const dist = point2.distance(controlCorner, viewCorner)

      if (dist < acc.minDist) {
        return {
          minDist: dist,
          minPoint: rp,
          minDiff: point2.difference(viewCorner, controlCorner)
        }
      }
      return acc
    }, { minDist: Infinity, minPoint: null, minDiff: null })

    if (!finding.minPoint) {
      // Weird situation. Keep the component where it is.
      return
    }

    // Closest corner pair found.
    // Position the control so that the distance between this pair stays same.
    const frx = finding.minPoint.rx
    const fry = finding.minPoint.ry
    comp.matchPoint(
      comp.atNorm(frx, fry),
      viewport.atNorm(frx, fry).translateBy(finding.minDiff)
    )
  })

  return this
}
