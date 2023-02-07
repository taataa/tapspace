module.exports = function (startPoint, endPoint) {
  // @Arc:setPoints(startPoint, endPoint)
  //
  // Set arc start and end points.
  //
  // Parameters:
  //   startPoint
  //     a Point
  //   endPoint
  //     a Point
  //
  // Return
  //   this, for chaining
  //

  const dist = startPoint.getDistanceTo(endPoint)
  const width = dist.transitRaw(this)

  // For computing stencil height and circle radius, see paper 2022-12-08-17.
  // The formula understands only positive angles.
  const absAngle = Math.abs(this.angle)
  const radius = width / (2 * Math.sin(absAngle / 2))
  const height = (width / 2) * Math.tan(absAngle / 4)

  // Stencil margin leaves room for the border middle section to be visible
  // and not sliced by the stencil. TODO maybe there's better approach?
  const stencilMargin = 2
  this.setSize(width, height + stencilMargin)

  // Circle size
  const diameter = radius * 2
  const diameterPx = diameter.toFixed(0) + 'px'
  this.circle.style.width = diameterPx
  this.circle.style.height = diameterPx
  this.circle.style.borderRadius = radius.toFixed(0) + 'px'

  // Circle position inside stencil.
  let offsetTop
  let offsetLeft
  if (this.angle >= 0) {
    // Display top of the circle
    offsetTop = 0
    offsetLeft = width / 2 - radius
  } else {
    // Display bottom of the circle
    offsetTop = height - diameter
    offsetLeft = width / 2 - radius
  }
  this.circle.style.top = offsetTop.toFixed(0) + 'px'
  this.circle.style.left = offsetLeft.toFixed(0) + 'px'

  // Stencil position in space.
  let startAnchor
  let endAnchor
  if (this.angle >= 0) {
    // Display the clockwise arc above the straight line.
    startAnchor = this.atBottomLeft()
    endAnchor = this.atBottomRight()
  } else {
    // Display the counter-clockwise arc below straight line.
    startAnchor = this.atTopLeft()
    endAnchor = this.atTopRight()
  }

  this.match({
    estimator: 'TR', // translate-rotate
    sources: [startAnchor, endAnchor],
    targets: [startPoint, endPoint]
  })

  return this
}
