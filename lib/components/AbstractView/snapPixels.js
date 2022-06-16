module.exports = function () {
  // Snap pixels TODO better docs

  // Delegate to each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].snapPixels()
  }
}
