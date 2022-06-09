const AbstractPlane = require('../../AbstractPlane')

const AffineControls = function () {
  // An affine group for viewport controls.
  //
  const elem = document.createElement('div')
  elem.className = 'affine-controls'

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
}

const proto = Object.assign({}, AbstractPlane.prototype)
AffineControls.prototype = proto
module.exports = AffineControls
