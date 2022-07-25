module.exports = function (opts) {
  // tapspace.components.AbstractView:renderTransform(opts)
  //
  // Updates the element.style.transform according to the plane projection.
  //
  // You need to call this function only when you have manually edited
  // or replaced a layer.proj object.
  //
  // Parameters:
  //   opts
  //     optional object. See AbstractPlane:renderTransform for details.
  //

  // Delegate to each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderTransform(opts)
  }
}
