/*
API v0.4.0
View
*/
var Emitter = require('component-emitter');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./transformer');
var move = require('movejs');

// Unique ID generator. Unique over session.
// Usage: seqid.next()
// Return: int
var seqid = require('seqid')(0);

var HTMLSpaceView = function (space, container) {
  Emitter(this);
  SpacePlane(this);
  Transformer(this);
  var this2 = this;

  // Test valid space
  if (typeof space !== 'object' || !('add' in space)) {
    throw 'Space should be a Space object';
  }
  // Test if valid dom element
  if (!('tagName' in container)) {
    throw 'Container should be a DOM Element';
  }

  // Both SpaceTaas and SpaceViews have unique IDs because there can be
  // plenty of both.
  this.id = seqid.next().toString();

  this.space = space;
  this._el = container;

  // Default transformation.
  // Transformation from space to view
  // One space unit (taa) becomes 256 pixels on screen.
  this.scale(this.at([0,0]), 256);

  // Two mappings from space taa ids:
  // 1. to HTML elements of the space taas.
  // 2. to SpaceTaa instances
  // Dev decision:
  //   For data structure, dict over list because key search time complexity.
  this._elements = {};
  this._spacetaas = {};

  // Listen the space for new taas or transformations

  this.space.on('contentAdded', function (spacetaa) {
    if (this2._elements.hasOwnProperty(spacetaa.id)) {
      // SpaceTaa is already drawn.
    } else {
      var img = new Image(1, 1);
      var taa = spacetaa.taa;
      img.src = taa.image.src;
      img.id = this2.id + '/' + spacetaa.id; // View-specific unique elem id
      img.className = 'taaspace-taa';
      // Show to client
      this2._el.appendChild(img);
      // Make referencable
      this2._elements[spacetaa.id] = img;
      this2._spacetaas[spacetaa.id] = spacetaa;
      // Make transformation
      var T = this2._T.multiplyBy(spacetaa._T);
      move(img).matrix(T.s, T.r, -T.r, T.s, T.tx, T.ty).end();
    }
  });

  this.space.on('contentRemoved', function (spacetaa) {
    var el;
    if (this2._elements.hasOwnProperty(spacetaa.id)) {
      el = this2._elements[spacetaa.id];
      // Remove HTML element
      this2._el.removeChild(el);
      // JS feature: does not throw if does not exist
      delete this2._elements[spacetaa.id];
      delete this2._spacetaas[spacetaa.id];
    }
  });

  this.space.on('contentTransformed', function (spacetaa) {
    // Update transformation
    var el;
    if (this2._elements.hasOwnProperty(spacetaa.id)) {
      el = this2._elements[spacetaa.id];
      // Make transformation
      var T = this2._T.multiplyBy(spacetaa._T);
      move(el).matrix(T.s, T.r, -T.r, T.s, T.tx, T.ty).end();
    }
  });

  this.getElementBySpaceTaa = function (spaceTaa) {
    // Get HTML element representation of the space taa.
    if (this._elements.hasOwnProperty(spaceTaa.id)) {
      return this._elements[spaceTaa.id];
    }
  };

  this.getSpaceTaaByElementId = function (id) {
    // Get space taa by HTML element id
    // Return null if no space taa for such id.
    var i = id.split('/');
    var spaceViewId = i[0];
    var spaceTaaId = i[1];
    if (this.id === spaceViewId) {
      if (this._spacetaas.hasOwnProperty(spaceTaaId)) {
        return this._spacetaas[spaceTaaId];
      }
    }
    return null;
  };

  this.atNorm = function (normxy) {
    // Example:
    //   view.atNorm([1, 0.5])
    //     gives the center of the right edge of the screen.
    var w = this._el.offsetWidth;
    var h = this._el.offsetHeight;
    var x = normxy[0] * w;
    var y = normxy[1] * h;
    return this.at([x, y]);
  };

  this.atMid = function () {
    // Center
    return this.atNorm([0.5, 0.5]);
  };

  this.getSize = function () {
    // Return [width, height] in pixels
    return [this._el.width, this._el.height];
  };

  this.getRootElement = function () {
    return this._el;
  };
};

var proto = HTMLSpaceView.prototype;

module.exports = HTMLSpaceView;
