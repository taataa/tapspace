//
// SpaceGroup
// A group of objects in space.
// The group should not have any representation in views.
//
var Space = require('./Space')
var SpacePlane = require('./SpacePlane')
var extend = require('extend')

var SpaceGroup = function (parent) {
  // A set of SpacePlanes.
  //
  // Parameters:
  //   parent
  //     a SpaceNode
  //
  SpacePlane.call(this)

  this.setParent(parent)
}

var p = extend({}, SpacePlane.prototype)
SpaceGroup.prototype = p

// Copy from Space
p.atMid = Space.prototype.atMid
p.getHull = Space.prototype.getHull

module.exports = SpaceGroup
