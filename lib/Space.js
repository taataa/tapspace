/*
Emits
  contentAdded
  contentRemoved
    not thrown if the content to remove did not exist in the first place.
  contentTransformed
*/
var Emitter = require('component-emitter')
var SpaceNode = require('./SpaceNode')
var SpacePlane = require('./SpacePlane')

var Space = function () {
  Emitter(this)
  SpaceNode(this)
  SpacePlane(this)
  // Space has constant identity transformation _T

  // Remove possibility to add to parent.
  this.setParent = function () {
    throw new Error('Space cannot have a parent.')
  }
  this.remove = function () {
    // Silent, already removed. Otherwise would throw the error in setParent
  }
}

module.exports = Space
