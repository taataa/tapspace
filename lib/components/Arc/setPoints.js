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
  const radius = width / (2 * Math.sin(this.angle / 2))
  const height = (width / 2) * Math.tan(this.angle / 4)

  // Stencil margin leaves room for the border middle section to be visible
  // and not sliced by the stencil. TODO maybe there's better approach?
  const stencilMargin = 2
  this.setSize(width, height + stencilMargin)

  // Circle size
  const diam = radius * 2
  const diamPx = diam.toFixed(0) + 'px'
  this.circle.style.width = diamPx
  this.circle.style.height = diamPx
  this.circle.style.borderRadius = radius.toFixed(0) + 'px'
  // Circle position inside stencil
  this.circle.style.top = (height - diam).toFixed(0) + 'px'
  this.circle.style.left = (width / 2 - radius).toFixed(0) + 'px'

  this.match({
    estimator: 'TR', // translate-rotate
    sources: [this.atTopRight(), this.atTopLeft()],
    targets: [startPoint, endPoint]
  })

  return this
}
