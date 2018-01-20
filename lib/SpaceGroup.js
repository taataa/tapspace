//
// SpaceGroup
// A group of objects in space.
// The group should not have any representation in views.
//
var Space = require('./Space')
var SpaceTransformer = require('./SpaceTransformer')
var extend = require('extend')

var SpaceGroup = function (parent) {
  // A set of SpaceTransformers.
  //
  // Parameters:
  //   parent
  //     a SpaceNode
  //
  SpaceTransformer.call(this)

  this.setParent(parent)
}

var p = extend({}, SpaceTransformer.prototype)
SpaceGroup.prototype = p

// Copy from Space
p.atMid = Space.prototype.atMid
p.getHull = Space.prototype.getHull

module.exports = SpaceGroup
