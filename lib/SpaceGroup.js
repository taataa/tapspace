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

  if (typeof parent === 'object') {
    this.setParent(parent)
  }
}

var p = extend({}, AbstractPlane.prototype)
SpaceGroup.prototype = p

// Copy from Space
p.atMid = Space.prototype.atMid
p.getHull = Space.prototype.getHull

p.copy = function () {
  // Return a deep copy of the SpaceGroup.
  // All the descendants are copied.
  //
  var g = new SpaceGroup()

  this.getChildren().forEach(function (child) {
    var c = child.copy()
    var t = child.getLocalTransform()
    c.setParent(g)
    c.setLocalTransform(t)
  })

  return g
}

module.exports = SpaceGroup
