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
  this.scale(this.at(0,0), 256);

  // A mapping from space-taa ids to HTML elements of the space taas.
  // For data structure, dict over list because key search time complexity.
  this._content = {};

  // Listen the space for new taas or transformations

  this.space.on('contentAdded', function (spacetaa) {
    if (this2._content.hasOwnProperty(spacetaa.id)) {
      // SpaceTaa is already drawn.
    } else {
      var img = new Image(256, 256);
      var taa = spacetaa.taa;
      img.src = taa.image.src;
      img.id = this2.id + '/' + spacetaa.id; // View-specific unique elem id
      img.className = 'taaspace-taa';
      // Show to client
      this2._el.appendChild(img);
      // Make referencable
      this2._content[spacetaa.id] = img;
      // Make transformation
      move(img).matrix(spacetaa._T.a, spacetaa._T.b,
                       spacetaa._T.c, spacetaa._T.d,
                       spacetaa._T.e, spacetaa._T.f).end();
    }
  });

  this.space.on('contentRemoved', function (spacetaa) {
    var el;
    if (this2._content.hasOwnProperty(spacetaa.id)) {
      el = this2._content[spacetaa.id];
      this2._el.removeChild(el);
      delete this2._content[spacetaa.id]; // does not throw if does not exist
    }
  });

  this.space.on('contentTransformed', function (spacetaa) {
    // Update transformation
    var el;
    if (this2._content.hasOwnProperty(spacetaa.id)) {
      el = this2._content[spacetaa.id];
      move(el).matrix(spacetaa._T.a, spacetaa._T.b,
                      spacetaa._T.c, spacetaa._T.d,
                      spacetaa._T.e, spacetaa._T.f).end();
    }
  });

  this.getElementBySpaceTaa = function (spaceTaa) {
    // Get HTML element representation of the space taa.
    if (this._content.hasOwnProperty(spaceTaa.id)) {
      return this._content[spaceTaa.id];
    }
  };

  this.getSpaceTaaById = function (id) {
    // Get space taa by HTML element id
    // Return null if no space taa for such id.
    var i = id.split('/');
    var spaceViewId = i[0];
    var spaceTaaId = i[1];
    if (this.id === spaceViewId) {
      if (this._content.hasOwnProperty(spaceTaaId)) {
        return this._content[spaceTaaId];
      }
    }
    return null;
  };

  this.atNorm = function (normxy) {
    // Example:
    //   view.atNorm([1, 0.5])
    //     gives the center of the right edge of the screen.
    var x = normxy[0] * this._el.width;
    var y = normxy[1] * this._el.height;
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
