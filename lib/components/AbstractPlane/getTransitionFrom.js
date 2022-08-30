const aff = require('affineplane')

module.exports = function (source) {
  // tapspace.components.AbstactPlane:getTransitionFrom(source)
  //
  // Parameters:
  //   source
  //     an AbstractPlane
  //
  // Return
  //   a plane3, a plane transition matrix.
  //
  const tr = this.getTransitionTo(source)
  const itr = aff.plane3.invert(tr)
  return itr
}
