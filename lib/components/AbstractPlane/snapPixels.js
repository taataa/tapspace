const geom = require('affineplane')
const abs = Math.abs

module.exports = function (options) {
  // tapspace.components.AbstractPlane:snapPixels(options)
  //
  // Rotation and non-integer translation blurs the pixels.
  // This can be annoying if the angle is close to the 90 deg modulo.
  // This method rounds the projection rotation slightly if it is close,
  // and rounds translation also to integer pixels if so.
  //
  // Note that the rounding affects the input coordinates and thus
  // snapPixels should NOT be used during a gesture except at the end.
  //
  // The method does not modify the plane projection, only the latent CSS.
  //
  // Parameters:
  //   options
  //     optional object with props:
  //       anchor
  //         optional point2 on the plane or Point.
  //         .. The point about to perform the rotation snapping.
  //         .. Rotation snapping around a point that is far from
  //         .. the user's gaze point – like viewport (0,0) – can cause
  //         .. visible translation near the gaze. The translation can
  //         .. be annoying during or after a rotation gesture.
  //         .. Therefore the rotation snapping should be performed
  //         .. around a point near the gesture and the gaze.
  //         .. Defaults to the plane anchor.
  //
  // TODO option to disable either rotation or translation snap
  //
  // Returns
  //   this, for chaining
  //
  if (!options) {
    options = {}
  }

  let proj = this.proj

  // Rotation matrices are awesome.
  // We can test 90 deg turns by checking if a or b is near zero.
  const tol = 0.02
  if (abs(proj.a) < tol || abs(proj.b) < tol) {
    // Normalise center arg
    const center = this.atAnchor(options.anchor).projectTo(this.getParent())
    // Snap to nearest orthogonal orientation.
    proj = geom.tran2.rotateToOrtho(proj, center)
    // Snap translation only if snapped angle. If angle was too far to snap,
    // the element does not benefit anything from translation snapping.
    proj = {
      a: proj.a,
      b: proj.b,
      x: Math.round(proj.x),
      y: Math.round(proj.y)
    }

    // Update css with custom projection.
    // Note that we avoid modifying this.proj.
    this.renderTransform({
      projection: proj
    })

    // DEBUG
    // console.log('snapPixels options anchor', options.anchor)
    // console.log('original proj', this.proj)
    // console.log('adjusted proj', proj)
  }

  return this
}
