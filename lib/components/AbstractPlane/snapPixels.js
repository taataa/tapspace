const geom = require('affineplane')
const abs = Math.abs

module.exports = function () {
  // Rotation and non-integer translation blurs the pixels.
  // This can be annoying if the angle is close to the 90 deg modulo.
  // This method rounds the projection rotation slightly if it is close,
  // and rounds translation also to integer pixels if so.
  //
  // Note that the rounding affects the input coordinates and thus
  // snapPixels should NOT be used during a gesture except at the end.
  //
  // The method modifies the plane projection.
  //
  // TODO option to disable either rotation or translation snap
  //
  // Returns
  //   this, for chaining
  //
  let proj = this.proj

  // Rotation matrices are awesome.
  // We can test 90 deg turns by checking if a or b is near zero.
  const tol = 0.04
  // Track angle snapping for translation snapping
  let angleSnapped = false
  if (abs(proj.a) < tol) {
    proj = {
      a: 0,
      b: proj.b,
      x: proj.x,
      y: proj.y
    }
    angleSnapped = true
  }
  if (abs(proj.b) < tol) {
    proj = {
      a: proj.a,
      b: 0,
      x: proj.x,
      y: proj.y
    }
    angleSnapped = true
  }
  // Snap translation only if snapped angle
  if (angleSnapped) {
    proj = {
      a: proj.a,
      b: proj.b,
      x: Math.round(proj.x),
      y: Math.round(proj.y)
    }
  }

  this.proj = proj

  this.renderCss()

  return this
}
