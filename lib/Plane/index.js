// Plane is a kind of a layer with z-dimension.
// There can be multiple spaces.
// A Plane is always a direct child of Viewport. TODO awkward restriction?

const Plane = function (el) {
  // Parameters:
  //   z
  //     optional number. Perspective distance from the viewer.
  //     Affects the scaling of the space.
  //     Default z=1 (no perspective scaling)
  //
  this.el = el
}

const proto = Plane.prototype

proto.at = function (x, y) {
  return {
    basis: this.el,
    x: x,
    y: y
  }
}

module.exports = Plane
