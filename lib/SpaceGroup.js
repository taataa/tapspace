//
// SpaceGroup
// A group of objects in space.
// The group should not have any representation in views.
//
var Space = require('./Space')
var AbstractPlane = require('./AbstractPlane')
var extend = require('extend')

var SpaceGroup = function (parent) {
  // A set of AbstractPlanes.
  //
  // Parameters:
  //   parent
  //     a AbstractNode
  //
  AbstractPlane.call(this)

  this.setParent(parent)
}

var p = extend({}, AbstractPlane.prototype)
SpaceGroup.prototype = p

// Copy from Space
p.atMid = Space.prototype.atMid
p.getHull = Space.prototype.getHull

module.exports = SpaceGroup
