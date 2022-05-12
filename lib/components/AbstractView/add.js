const tran2 = require('affineplane').tran2

module.exports = function (layer, placement) {
  // Insert the layer it into the viewport.
  //
  // Parameters:
  //   layer
  //     a Layer
  //   placement
  //     position
  //       { x, y } on the viewport or a Point.
  //       The layer's (0,0) will be initially matched with this position.
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //
  // Return
  //   this, for chaining
  //

  // Insert to DOM
  this.element.appendChild(layer.element)

  // Create transformation
  const r = placement.rotation
  const s = placement.scale
  const tx = placement.position.x
  const ty = placement.position.y
  const proj = tran2.fromPolar(s, r, tx, ty)

  // Set layer projection.
  // Is a combination of viewport projection TODO think through
  layer.proj = tran2.compose(this.proj, proj)

  // For chaining
  return this
}
