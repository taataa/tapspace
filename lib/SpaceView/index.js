// SpaceView wraps the element that is to be used as a viewport
// to the affine dom.
//
// SpaceView has interface similar to SpaceElement but
// the implementation is quite different.
//
const proj = require('../geom/proj')

const SpaceView = function (el) {
  // A project from the view element onto the space.
  // TODO is Space only a mathematical concept or a concrete Element?
  this.proj = proj.IDENTITY

  // Reset element styles.
  // Space elements are absolutely positioned and therefore
  // the view must be either absolutely or relatively positioned.
  const pos = el.style.position
  if (pos !== 'absolute' || pos !== 'relative') {
    el.style.position = 'relative'
  }

  // We attach the space object directly to the view's dom element.
  // The property will also identify the element as a view.
  el.affineview = this

  this.el = el
}

const proto = SpaceView.prototype

proto.at = (x, y) => {
  // Parameters
  //   x
  return {
    el: this.el, // plane
    x: x,
    y: y
  }
}

proto.atNorm = (rx, ry) => {
  // Get point by relative coordinates.
  //
  // Parameters:
  //   rx
  //     number. 0 at left edge, 1 at right edge.
  //   ry
  //     number. 0 at top edge, 1 at bottom edge.
  //
  // Return
  //   point2 on the view
  //
  const w = this.el.offsetWidth
  const h = this.el.offsetHeight
  return {
    el: this.el, // plane
    x: rx * w,
    y: ry * h
  }
}

proto.atMid = () => {
  return this.atNorm(0.5, 0.5)
}
