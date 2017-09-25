// API v3

var Emitter = require('component-emitter');
var SpaceNode = require('./SpaceNode');
var SpacePlane = require('./SpacePlane');
var SpaceTransformer = require('./SpaceTransformer');
var SpaceRectangle = require('./SpaceRectangle');

var SpaceImage = function (parent, img) {
  // Parameters:
  //   parent
  //     a SpaceNode
  //   img
  //     a preloaded HTMLImageElement
  Emitter(this);
  SpaceNode(this);
  SpacePlane(this);
  SpaceTransformer(this);
  SpaceRectangle(this);

  this.image = img;
  this.resize([img.width, img.height]);  // Size of the rectangle.

  this.setParent(parent);
};

module.exports = SpaceImage;
