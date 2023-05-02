module.exports = function () {
  // @Viewport:getFieldOfView()
  //
  // Get horizontal and vertical field-of-view angles for the viewport.
  // The angles are in radians. Convert to degrees via `deg = rad * 180/π`
  //
  // Return
  //   an object `{ horizontal: <radians>, vertical: <radians> }`
  //

  const cz = this.cameraDistance
  const w = this.element.offsetWidth
  const h = this.element.offsetHeight

  return {
    horizontal: 2 * Math.atan(w / (2 * cz)),
    vertical: 2 * Math.atan(h / (2 * cz))
  }
}
