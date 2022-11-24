const Plane = require('../../Plane')

const AffineControls = function () {
  // An affine group for viewport controls.
  //
  const elem = document.createElement('div')
  elem.className = 'affine-controls'

  // Use default anchor 0,0
  Plane.call(this, elem)
}

const proto = Object.assign({}, Plane.prototype)
AffineControls.prototype = proto
module.exports = AffineControls
