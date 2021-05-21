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
