// Layer is a kind of a 2D plane with z-dimension.
// There can be multiple layerse.
// A Layer is always a direct child of Viewport. TODO awkward restriction?

const Layer = function (el) {
  // Parameters:
  //   z
  //     optional number. Perspective distance from the viewer.
  //     Affects the scaling of the space.
  //     Default z=1 (no perspective scaling)
  //
  this.el = el
}

const proto = Layer.prototype

proto.at = function (x, y) {
  return {
    basis: this.el,
    x: x,
    y: y
  }
}

module.exports = Layer
