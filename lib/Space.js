//
// Emits
//  contentAdded
//  contentRemoved
//    not thrown if the content to remove did not exist in the first place.
//  contentTransformed
//
var SpacePlane = require('./SpacePlane')
var InvariantPath = require('./InvariantPath')
var extend = require('extend')

var Space = function () {
  SpacePlane.call(this)
  // Space has constant identity transformation _T
}

var p = extend({}, SpacePlane.prototype)
Space.prototype = p

p.setParent = function () {
  // Remove possibility to add to parent.
  throw new Error('Space cannot have a parent.')
}

p.remove = function () {
  // Silent, already removed. Otherwise would throw the error in setParent
}

p.getHull = function () {
  // Get bounding box as an InvariantPath. Equals the convex hull
  // of the children. Iterates over all SpaceNodes so keep an eye on
  // efficiency.
  //
  // Return
  //   InvariantPath
  //   null
  //     If no children. No convex hull exists.
  //

  var children = this.getChildren()

  if (children.length < 1) {
    return null
  }

  var ip = children.reduce(function (acc, child) {
    return acc.add(child.getHull())
  }, new InvariantPath())

  return ip.getHull()
}

module.exports = Space
