const Basis = require('../../Basis')

const ViewportControls = function () {
  // @ViewportControls()
  //
  // Inherits Basis
  //
  // A container for viewport controls.
  //
  const elem = document.createElement('div')
  elem.className = 'affine-controls'

  // Use default anchor 0,0
  Basis.call(this, elem)
}

const proto = Object.assign({}, Basis.prototype)
ViewportControls.prototype = proto
module.exports = ViewportControls
