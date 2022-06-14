const geom = require('affineplane')
const Point = require('../../geometry/Point')

module.exports = function (angle, opts) {
  // Rotate the viewport in space around anchor.
  //
  // Parameters
  //   angle
  //     a number, the delta angle to rotate the viewport.
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
  const center = this.atAnchor(opts.anchor)

  // Rotate each layer.
  // TODO snapAngle
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].rotateBy(angle, { anchor: center })
  }

  return this
}
