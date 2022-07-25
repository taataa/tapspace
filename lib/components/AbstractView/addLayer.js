const Layer = require('../Layer')

module.exports = function (z, placement) {
  // tapspace.components.AbstractView:addLayer(z, placement)
  //
  // Create and add a new layer.
  //

  // Insert the layer element at the correct index
  // according to rendering order and depth.
  const newLayer = new Layer(z)

  // TODO insert to index according to depth

  this.space.add(newLayer, placement)

  return newLayer
}
