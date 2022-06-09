// Affine component for viewport controls
//
// TODO should be hidden under AbstractView because
// this is only for it?
//
const AbstractPlane = require('../AbstractPlane')

const AffineControls = function () {
  const elem = document.createElement('div')
  elem.className = 'affine-controls'

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
}

const proto = Object.assign({}, AbstractPlane.prototype)
AffineControls.prototype = proto
module.exports = AffineControls
