/*
API v0.4.0
View
*/
var Emitter = require('component-emitter');
var SpaceContainer = require('./SpaceContainer');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');
var SpaceRectangle = require('./SpaceRectangle');
var move = require('movejs');

// Disable animations by default.
move.defaults = { duration: 0 };

var HTMLSpaceView = function (space, htmlContainer) {
  // Test if valid dom element
  if (!('tagName' in htmlContainer)) {
    throw 'Container should be a DOM Element';
  }

  Emitter(this);
  SpaceContainer(this);
  SpacePlane(this);
  Transformer(this);
  SpaceRectangle(this);
  var this2 = this;

  this._el = htmlContainer;

  // Two mappings from space taa ids:
  // 1. to HTML elements of the space taas.
  // 2. to SpaceTaa instances
  // Dev decision:
  //   For data structure, dict over list because key search time complexity.
  this._elements = {};
  this._spacetaas = {};

  (function initSize() {
    var w = this2._el.clientWidth;
    var h = this2._el.clientHeight;
    this2.resize([w, h]);
  }());

  var transformImage = function (img, spacetaa) {
    // Transform images because the view orientation.
    // See 2016-03-05-09.
    var spacetaa_global_T = spacetaa.getGlobalTransform();
    var T = this2._T.inverse().multiplyBy(spacetaa_global_T);
    // TODO What if view parent is not the root?
    //   Solution: getTransformTo(plane)
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

  var contentAddedHandler = function (spacetaa) {
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
  };

  var contentRemovedHandler = function (spacetaa) {
    var el;
    if (this2._elements.hasOwnProperty(spacetaa.id)) {
      el = this2._elements[spacetaa.id];
      // Remove HTML element
      this2._el.removeChild(el);
      // JS feature: does not throw if does not exist
      delete this2._elements[spacetaa.id];
      delete this2._spacetaas[spacetaa.id];
    }
  };

  var contentTransformedHandler = function (spacetaa) {
    // Update transformation
    var el;
    if (this2._elements.hasOwnProperty(spacetaa.id)) {
      el = this2._elements[spacetaa.id];
      // Make transformation
      transformImage(el, spacetaa);
    }
  };

  this.on('added', function (self, newParent) {
    newParent.on('contentAdded', contentAddedHandler);
    newParent.on('contentRemoved', contentRemovedHandler);
    newParent.on('contentTransformed', contentTransformedHandler);
  });
  this.on('removed', function (self, oldParent) {
    oldParent.off('contentAdded', contentAddedHandler);
    oldParent.off('contentRemoved', contentRemovedHandler);
    oldParent.off('contentTransformed', contentTransformedHandler);
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

  // View ready to be added to Space.
  this.setParent(space);
};

module.exports = HTMLSpaceView;
