module.exports = function (optimalAreaRatio) {
  // @Measurement:getVisualDistance([optimalAreaRatio])
  //
  // Compute a visual, virtual, heuristic distance to the target.
  // Measures how prominent the target is for the user.
  //
  // Parameters:
  //   optimalAreaRatio
  //     optional number, default is 0.1.
  //     .. The most favourable ratio between the area consumed by
  //     .. the prominent content and by the viewport.
  //
  // Return
  //   a number
  //

  if (!optimalAreaRatio) {
    optimalAreaRatio = 0.1
  }

  if (!this.visible) {
    return Infinity
  }

  // Prerequisites
  const camDist = this.viewportDiameter / 2

  // The optimal ratio times x equals the target area ratio.
  // areaDilation^2 * optimalAreaRatio = areaRatio
  const areaDilation = Math.sqrt(this.areaRatio / optimalAreaRatio)
  const dz = camDist / (areaDilation < 1 ? areaDilation : 1 / areaDilation)
  const h = this.distanceToViewport + dz

  return h
}
