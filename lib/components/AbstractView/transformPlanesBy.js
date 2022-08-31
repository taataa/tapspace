const geom = require('affineplane')

module.exports = function (tran, opts) {
  // tapspace.components.AbstractView:transformPlanesBy(tran, opts)
  //
  // Transform the root planes in relation to the viewport. In effect, this
  // transforms all planes with the tran. Use this to navigate the space.
  //
  // Parameters:
  //   tran
  //     a Transform
  //   opts
  //     optional object with props:
  //       silent event options TODO
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view
  if (tran.basis) {
    const plane = tran.basis.getTransitionTo(this)
    tran = geom.helm3.transitFrom(tran, plane)
  }

  const planes = this.space.getChildren()

  // Transform each plane silently.
  // Plane transitions contain transition to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < planes.length; i += 1) {
    const plane = planes[i]
    plane.tran = geom.plane3.transform(plane.tran, tran)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].renderTransform(opts)
  }

  return this
}
