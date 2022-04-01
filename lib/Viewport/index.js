// SpaceView wraps the element that is to be used as a viewport
// to the affine dom.
//
// SpaceView has interface similar to SpaceElement but
// the implementation is quite different.
//
const proj = require('../geom/proj')

const Viewport = function (el) {
  if (typeof el === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    el = document.querySelector(el)
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

  // A project from the view element onto the space.
  // TODO is Space only a mathematical concept or a concrete Element?
  this.proj = proj.IDENTITY

  // We attach the space object directly to the view's dom element.
  // The property will also identify the element as a view.
  el.affineview = this

  this.el = el

  // Viewport listens to transformed events
  // and reflects them to its children.
  el.addEventListener('transformed', (ev) => {
    // invert the transform
    // for each affine children
    //   apply the inv transform
  })
}

const proto = Viewport.prototype

proto.at = function (x, y) {
  // Parameters
  //   x
  return {
    basis: this.el, // plane
    x: x,
    y: y
  }
}

proto.atNorm = function (rx, ry) {
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
    basis: this.el, // plane
    x: rx * w,
    y: ry * h
  }
}

proto.atMid = function () {
  return this.atNorm(0.5, 0.5)
}

module.exports = Viewport
