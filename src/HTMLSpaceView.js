/*
API v0.4.0
View
*/
var Emitter = require('component-emitter');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');
var SpaceRectangle = require('./SpaceRectangle');
var nudged = require('nudged');
var move = require('movejs');

// Disable animations by default.
move.defaults = { duration: 0 };

// Unique ID generator. Unique over session.
// Usage: seqid.next()
// Return: int
var seqid = require('seqid')(0);

var HTMLSpaceView = function (space, container) {
  Emitter(this);
  SpacePlane(this);
  Transformer(this);
  SpaceRectangle(this);
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

  (function initSize() {
    var w = container.clientWidth;
    var h = container.clientHeight;
    this2.resize([w, h]);
  }());

  // Two mappings from space taa ids:
  // 1. to HTML elements of the space taas.
  // 2. to SpaceTaa instances
  // Dev decision:
  //   For data structure, dict over list because key search time complexity.
  this._elements = {};
  this._spacetaas = {};

  var transformImage = function (img, spacetaa) {
    // Transform images because the view orientation.
    // See 2016-03-05-09.
    var T = this2._T.inverse().multiplyBy(spacetaa._T);
    // TODO Current move.js does not prevent scientific notation reaching CSS
    // which leads to problems with Safari and Opera. Therefore we must
    // prevent the notation here.
    // Of course this will cause error in the presentation.
    // However the error is only in the presentation and thus not a problem.
    var prec = 8;
    var s = T.s.toFixed(prec);
    var r = T.r.toFixed(prec);
    var tx = T.tx.toFixed(prec);
    var ty = T.ty.toFixed(prec);
    move(img).matrix(s, r,-r, s, tx, ty).end();
  };

  // Listen the space for new taas or transformations

  this.space.on('contentAdded', function (spacetaa) {
    if (this2._elements.hasOwnProperty(spacetaa.id)) {
      // SpaceTaa is already drawn.
    } else {
      var taa = spacetaa.taa;
      var el = new Image(256, 256);
      el.src = taa.image.src;
      el.id = this2.id + '/' + spacetaa.id; // View-specific unique elem id
      el.className = 'taaspace-taa';
      // Show to client
      this2._el.appendChild(el);
      // Make referencable
      this2._elements[spacetaa.id] = el;
      this2._spacetaas[spacetaa.id] = spacetaa;
      // Make transformation
      transformImage(el, spacetaa);
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
      transformImage(el, spacetaa);
    }
  });

  // If the view is transformed, we of course need to retransform everything.
  this.on('transformed', function () {
    var id, element, spacetaa;
    for (id in this2._elements) {
      if (this2._elements.hasOwnProperty(id)) {
        element  = this2._elements[id];
        spacetaa = this2._spacetaas[id];
        transformImage(element, spacetaa);
      }
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

  this.getRootElement = function () {
    return this._el;
  };
};

var proto = HTMLSpaceView.prototype;

module.exports = HTMLSpaceView;
