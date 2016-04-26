// API v3.0.0

var Emitter = require('component-emitter');
var SpaceNode = require('./SpaceNode');
var SpacePlane = require('./SpacePlane');
var SpaceTransformer = require('./SpaceTransformer');
var SpaceRectangle = require('./SpaceRectangle');

var SpaceTaa = function (parent, taa) {
  // Parameters:
  //   parent
  //     a SpaceNode
  //   taa
  //     a Taa
  Emitter(this);
  SpaceNode(this);
  SpacePlane(this);
  SpaceTransformer(this);
  SpaceRectangle(this);

  this.taa = taa;
  this.resize([256, 256]);  // Size of taa.

  this.setParent(parent);
};

module.exports = SpaceTaa;
