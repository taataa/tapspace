//
// Emits
//  contentAdded
//  contentRemoved
//    not thrown if the content to remove did not exist in the first place.
//  contentTransformed
//
var SpacePlane = require('./SpacePlane')
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

module.exports = Space
