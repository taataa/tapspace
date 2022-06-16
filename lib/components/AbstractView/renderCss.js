module.exports = function (opts) {
  // You need to call this function only when you have manually edited
  // or replaced a layer.proj object.
  //
  // Update the element.style.transform according to the plane placement
  // and optionally element.style.transition if you want animation.
  //
  // Parameters:
  //   opts
  //     optional object. See AbstractPlane:renderCss for details.
  //

  // Delegate to each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].renderCss(opts)
  }
}
