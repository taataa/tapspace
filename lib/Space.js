//
// Emits
//  contentAdded
//  contentRemoved
//    not thrown if the content to remove did not exist in the first place.
//  contentTransformed
//
var SpacePlane = require('./SpacePlane')
var Path = require('./Path')
var Vector = require('./Vector')
var InvariantPath = require('./InvariantPath')
var extend = require('extend')

var Space = function () {
  SpacePlane.call(this)
  // Space has constant identity transformation _T
}

var p = extend({}, SpacePlane.prototype)
Space.prototype = p

p.atMid = function () {
  // Get a Vector to the centroid of the bounding convex hull.
  // Rather computationally intensive.
  return this.getHull().atMid()
}

p.setParent = function () {
  // Remove possibility to add to parent.
  throw new Error('Space cannot have a parent.')
}

p.remove = function () {
  // Silent, already removed. Otherwise would throw the error in setParent
}

p.getHull = function () {
  // Get bounding box as an InvariantPath. Equals the convex hull
  // of the children. Iterates over all children SpaceNodes so keep an eye on
  // efficiency.
  //
  // Return
  //   InvariantPath
  //     If no children, returns a path with single point at origin.
  //

  var children = this.getChildren()

  if (children.length < 1) {
    return new InvariantPath(new Path([new Vector(0, 0)]), this)
  }

  var ip = children.reduce(function (acc, child) {
    return acc.add(child.getHull())
  }, new InvariantPath())

  return ip.getHull()
}

module.exports = Space
