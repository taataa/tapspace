//
// SpacePixel
// A simple rectangular object in space with size 1x1
// Created for testing purposes.
//
var SpaceRectangle = require('./SpaceRectangle')
var Vector = require('./Vector')
var extend = require('extend')

var SpacePixel = function (parent, color) {
  // A 1x1 rectangle
  //
  // Parameters:
  //   parent
  //     a SpaceNode
  //   color
  //     CSS color string. Optional, default '#000000'
  //
  SpaceRectangle.call(this)

  this.color = (typeof color === 'string' ? color : '#000000')
  this.setLocalSize(new Vector(1, 1))
  this.setParent(parent)
}

SpacePixel.prototype = extend({}, SpaceRectangle.prototype)

module.exports = SpacePixel
