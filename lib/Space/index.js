// Space is a kind of a layer with z-dimension.
// There can be multiple spaces.
// A Space is always a direct child of View.

const Space = function (z) {
  // Parameters:
  //   z
  //     optional number. Perspective distance from the viewer.
  //     Affects the scaling of the space.
  //     Default z=1 (no perspective scaling)
  //
  this.el = document.createElement('div')
  this.el.className = 'ad-space'

  if (typeof z === 'number') {
    this.z = z
  } else {
    this.z = 1
  }
}

const proto = Space.prototype

proto.at = function (x, y) {

}

module.exports = Space
