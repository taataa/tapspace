const plane3 = require('affineplane').plane3
const abs = Math.abs

module.exports = function (anchor) {
  // @Plane:snapPixels([anchor])
  //
  // Rotation and non-integer translation blurs the pixels.
  // This can be annoying if the angle is close to the 90 deg modulo.
  // This method rounds the transition rotation slightly if it is close,
  // and rounds translation also to integer pixels if so.
  //
  // Note that the rounding affects the input coordinates and thus
  // snapPixels should NOT be used during a gesture except at the end.
  // Otherwise the gesture appears jittery and unpleasant.
  // Also in the perspective view mode the snapping is a lost cause,
  // because almost nothing matches the screen pixels exactly.
  //
  // The method does not modify the plane transition, only the latent CSS.
  //
  // Parameters:
  //   anchor
  //     optional Point.
  //     .. The point is the pivot about to perform the rotation snapping.
  //     .. Rotation snapping around a point that is far from
  //     .. the user's gaze point – like viewport (0,0) – can cause
  //     .. visible movement near the gaze point. This movement can
  //     .. be annoying during or after a rotation gesture.
  //     .. Therefore the rotation snapping should be performed
  //     .. around a point near the gesture and the gaze point.
  //     .. Defaults to the plane anchor.
  //
  // Returns
  //   this, for chaining
  //

  // TODO option to disable either rotation or translation snap

  // Normalize anchor. Anchor argument can be nullish.
  anchor = this.atAnchor(anchor)

  // Rotation matrices are awesome.
  // We can test 90 deg turns by checking if a or b is near zero.
  let tran = this.tran
  const tol = 0.02
  if (abs(tran.a) < tol || abs(tran.b) < tol) {
    // rotateToOrtho requires the center to be on the outer basis.
    const center = anchor.transitRaw(this.getParent())
    // Snap to nearest orthogonal orientation.
    tran = plane3.rotateToOrtho(tran, center)
    // Snap translation only if the angle was or is snapped.
    // This is because, if the angle was too far to snap,
    // the element does not benefit anything from translation snapping.
    tran = {
      a: tran.a,
      b: tran.b,
      x: Math.round(tran.x),
      y: Math.round(tran.y),
      z: tran.z
    }

    // Update css with custom transition.
    // Note that we avoid modifying this.tran.
    this.renderTransform(tran)

    // DEBUG
    // console.log('snapPixels anchor', anchor)
    // console.log('original plane', this.tran)
    // console.log('adjusted plane', tran)
  }

  return this
}
