/*
# SpaceElement

A HTMLElement [1] in the space.

[1] https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
*/

var Emitter = require('component-emitter');
var SpaceNode = require('./SpaceNode');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');
var SpaceRectangle = require('./SpaceRectangle');

var SpaceHTML = function (parent, html) {
  // Parameters:
  //   parent:
  //     a SpaceNode
  //   html:
  //     a string, containing html
  Emitter(this);
  SpaceNode(this);
  SpacePlane(this);
  Transformer(this);
  SpaceRectangle(this);

  this.html = html;
  this.resize([256, 256]);  // Initial element size.

  this.setParent(parent);
};

module.exports = SpaceHTML;
