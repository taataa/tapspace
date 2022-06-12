const geom = require('affineplane')
const Point = require('../../geometry/Point')

module.exports = function (factor, opts) {
  // Translate the viewport in space along x and y axis.
  //
  // Parameters
  //   factor
  //     a number
  //   opts
  //     anchor
  //       an optional Point. Scaling is performed about this point.
  //       ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // Normalize the anchor point onto the viewport.
  let center
  if (opts.anchor) {
    // Use custom anchor
    if (opts.anchor.basis) {
      // Normalize
      const pr = opts.anchor.basis.getProjectionTo(this)
      center = geom.proj2.point2(pr, opts.anchor) // becomes plain {x,y}
    } else {
      // Assume on the element.
      center = opts.anchor
    }
  } else {
    // Otherwise use the plane anchor
    center = this.anchor
  }
  // Make the center a Point
  center = new Point(this, center.x, center.y)

  const layers = this.getLayers()

  // Scale each layer silently.
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].scaleBy(factor, { anchor: center })
  }

  // TODO render css

  return this
}
