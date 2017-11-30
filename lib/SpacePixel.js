// API v3.0.0
//
// SpacePixel
// A simple rectangular object in space with size 1x1
// Created for testing purposes.

var Emitter = require('component-emitter')
var SpaceNode = require('./SpaceNode')
var SpacePlane = require('./SpacePlane')
var SpaceTransformer = require('./SpaceTransformer')
var SpaceRectangle = require('./SpaceRectangle')

var SpacePixel = function (parent) {
  // A 1x1 rectangle
  //
  // Parameters:
  //   parent
  //     a SpaceNode
  Emitter(this)
  SpaceNode(this)
  SpacePlane(this)
  SpaceTransformer(this)
  SpaceRectangle(this)

  this.resize([1, 1])
  this.setParent(parent)
}

module.exports = SpacePixel
