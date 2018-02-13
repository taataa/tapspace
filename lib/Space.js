//
// Space. The root item.
//
var Path = require('./geom/Path')
var Vector = require('./geom/Vector')
var IPath = require('./geom/IPath')
var AbstractPlane = require('./AbstractPlane')
var extend = require('extend')

var Space = function () {
  AbstractPlane.call(this)
  // Space has constant identity transformation _T
}

var p = extend({}, AbstractPlane.prototype)
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
  // Get bounding box as an IPath. Equals the convex hull
  // of the children. Iterates over all children AbstractNodes so keep an eye on
  // efficiency.
  //
  // Return
  //   IPath
  //     If no children, returns a path with single point at origin.
  //

  var children = this.getChildren()

  if (children.length < 1) {
    return new IPath(new Path([new Vector(0, 0)]), this)
  }

  var ip = children.reduce(function (acc, child) {
    return acc.add(child.getHull())
  }, new IPath())

  return ip.getHull()
}

module.exports = Space
