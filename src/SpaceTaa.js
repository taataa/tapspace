// v0.3.0

var Emitter = require('component-emitter');
var SpaceContainer = require('./SpaceContainer');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');
var SpaceRectangle = require('./SpaceRectangle');

var SpaceTaa = function (parent, taa) {
  Emitter(this);
  SpaceContainer(this);
  SpacePlane(this);
  Transformer(this);
  SpaceRectangle(this);

  this.taa = taa;
  this.resize([256, 256]); // Size of taa.

  this.setParent(parent);
};

module.exports = SpaceTaa;
