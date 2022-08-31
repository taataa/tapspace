module.exports = function (opts) {
  // tapspace.components.AbstractView:renderTransform(opts)
  //
  // Updates the element.style.transform according to the plane transition.
  //
  // You need to call this function only when you have manually edited
  // or replaced a plane.tran object.
  //
  // Parameters:
  //   opts
  //     optional object. See AbstractPlane:renderTransform for details.
  //

  // Delegate to each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].renderTransform(opts)
  }
}
