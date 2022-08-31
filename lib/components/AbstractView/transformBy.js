const geom = require('affineplane')

module.exports = function (tr, opts) {
  // tapspace.components.AbstractView:transformBy(tran, opts)
  //
  // Overwrites AbstractPlane:transformBy
  //
  // Transform the viewport in relation to the root planes. In effect, this
  // transforms all root planes with the inversion of the tran.
  //
  // Parameters:
  //   tr
  //     a Transform
  //   opts
  //     optional object with props
  //       silent event options TODO
  //
  // Return
  //   this, for chaining
  //

  // Normalize onto the view
  if (tr.basis) {
    const plane = tr.basis.getTransitionTo(this)
    tr = geom.helm3.transitFrom(tr, plane)
  }

  const planes = this.space.getChildren()

  // We have to invert the transform because of the viewport illusion.
  // The viewport does not move relative to the page.
  // Instead, the content of the viewport moves in inverted manner.
  // For example, the illusion of the viewport moving right in space
  // is achieved by moving the space left.
  const itr = geom.helm3.invert(tr)

  // Transform each root plane silently.
  // Plane transitions denote transition to the viewport.
  // Viewport is transformed.
  for (let i = 0; i < planes.length; i += 1) {
    const plane = planes[i]
    plane.tran = geom.plane3.transform(plane.tran, itr)
    // Rounding to pixel? No, because slow pan becomes very random.
  }

  // Update planes' CSS transform
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].renderTransform(opts)
  }

  return this
}
