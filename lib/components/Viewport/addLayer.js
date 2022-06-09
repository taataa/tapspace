const Layer = require('../Layer')

module.exports = function (z, placement) {
  // Create and add a new layer.
  //
  // Insert the layer element at the correct index
  // according to rendering order and depth.
  const newLayer = new Layer(z)

  // TODO insert to index according to depth

  this.layersElem.appendChild(newLayer)

  // TODO move the layer
  newLayer.placeTo(placement)

  return newLayer
}
