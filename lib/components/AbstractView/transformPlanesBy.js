const plane3 = require('affineplane').plane3

module.exports = function (tran) {
  // tapspace.components.AbstractView:transformPlanesBy(tran, opts)
  //
  // Transform the root planes in relation to the viewport. In effect, this
  // transforms all planes with the tran. Use this to navigate the space.
  //
  // Parameters:
  //   tran
  //     a Transform
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view
  if (tran.changeBasis) {
    tran = tran.changeBasis(this).helm
  }

  const planes = this.space.getChildren()

  // Transform each plane silently.
  // Plane transitions contain transition to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < planes.length; i += 1) {
    const plane = planes[i]
    plane.tran = plane3.transform(plane.tran, tran)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].renderTransform()
  }

  return this
}
