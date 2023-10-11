const plane3 = require('affineplane').plane3
const abs = Math.abs

module.exports = function (pivot) {
  // @Transformer:snapPixels([pivot])
  //
  // Coordinates of plane do not always match the pixel grid
  // of the screen device. This causes especially
  // rotation and non-integer translation to blur the pixels of images a bit.
  // This blurring can be annoying if the angle is close to a 90 deg or its
  // multitude but not exactly.
  //
  // To make the images crispier and the pixels match the screen pixel grid,
  // snapPixels method adjusts the translation and visible rotation slightly.
  //
  // The method does not modify the plane transition, i.e. the true coordinates
  // of the plane, only the latent CSS rendered by the browser.
  // However when snapPixels is applied to interactive planes, such as
  // the viewport, the rounding can affect the input pointer coordinates.
  // Therefore snapPixels should NOT be used during a gesture,
  // but immediately after at the gesture end.
  // Otherwise the gesture appears jittery and unpleasant.
  //
  // In the perspective view mode (3D) the pixel snapping is a lost cause,
  // because in that case almost nothing matches the screen pixels exactly.
  //
  // Parameters:
  //   pivot
  //     optional Point. Defaults to the plane anchor.
  //     .. The pivot is the point about to perform the rotation snapping.
  //     .. Rotation snapping around a point that is far from
  //     .. the user's gaze point – like viewport (0,0) – can cause
  //     .. visible unexpected movement near the gaze point.
  //     .. Therefore pick a pivot point that is
  //     .. near the gesture and the gaze point.
  //
  // Returns
  //   this, for chaining
  //

  // TODO option to disable either rotation or translation snap

  // Normalize pivot. Pivot argument can be nullish.
  pivot = this.atAnchor(pivot)

  // Rotation matrices are awesome.
  // We can test 90 deg turns by checking if a or b is near zero.
  let tran = this.tran
  const tol = 0.02
  if (abs(tran.a) < tol || abs(tran.b) < tol) {
    // rotateToOrtho requires the pivot to be on the outer basis.
    const pivotOnParent = pivot.transitRaw(this.getParent())
    // Snap to nearest orthogonal orientation.
    tran = plane3.rotateToOrtho(tran, pivotOnParent)
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
    // console.log('snapPixels pivot', pivot)
    // console.log('original plane', this.tran)
    // console.log('adjusted plane', tran)
  }

  return this
}
