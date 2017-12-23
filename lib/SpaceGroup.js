//
// SpaceGroup
// A group of objects in space.
// The group should not have any representation in views.
//
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

SpaceGroup.prototype = extend({}, SpaceTransformer.prototype)

module.exports = SpaceGroup
