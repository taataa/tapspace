//
// SpacePixel
// A simple rectangular object in space with size 1x1
// Created for testing purposes.
//
var Vector = require('./geom/Vector')
var AbstractRectangle = require('./AbstractRectangle')
var extend = require('extend')

var SpacePixel = function (parent, color) {
  // A 1x1 rectangle
  //
  // Parameters:
  //   parent
  //     a AbstractNode
  //   color
  //     CSS color string. Optional, default '#000000'
  //
  AbstractRectangle.call(this)

  this.color = (typeof color === 'string' ? color : '#000000')
  this.setLocalSize(new Vector(1, 1))
  this.setParent(parent)
}

SpacePixel.prototype = extend({}, AbstractRectangle.prototype)

SpacePixel.prototype.getColor = function () {
  return this.color
}

module.exports = SpacePixel
