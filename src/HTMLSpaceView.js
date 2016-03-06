/*
API v0.4.0
View
*/
var Emitter = require('component-emitter');
var SpaceContainer = require('./SpaceContainer');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');
var SpaceRectangle = require('./SpaceRectangle');
var SpaceTaa = require('./SpaceTaa');
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

  // Listen the space for new or removed taas or transformations

  var contentAddedHandler = function (spacecontainer, newParent, oldParent) {
    if (typeof oldParent === 'undefined') { oldParent = null; }
    if (typeof newParent === 'undefined') { newParent = null; }

    // SpaceView, SpaceTaa ...
    var con = spacecontainer;

    if (this2._elements.hasOwnProperty(con.id)) {
      // Content is already drawn.
    } else {
      if (con instanceof SpaceTaa) {
        var taa = con.taa;
        var el = new Image(256, 256);
        el.src = taa.image.src;
        el.id = this2.id + '/' + con.id; // View-specific unique elem id
        el.className = 'taaspace-taa';
        // Show to client
        this2._el.appendChild(el);
        // Make referencable
        this2._elements[con.id] = el;
        this2._spacetaas[con.id] = con;
        // Make transformation
        transformImage(el, con);
      } else if (con instanceof HTMLSpaceView) {
        // No representation for views.
      } else {
        throw new Exception('Unknown space content; cannot represent');
      }
    }
  };

  var contentRemovedHandler = function (spacecontent, oldParent, newParent) {
    if (typeof oldParent === 'undefined') { oldParent = null; }
    if (typeof newParent === 'undefined') { newParent = null; }

    var sameRoot, el, con;

    con = spacecontent; // Alias

    // Decide sameRoot
    if (oldParent === null || newParent === null) {
      sameRoot = false;
    } else {
      sameRoot = oldParent.getRootParent() === newParent.getRootParent();
    }

    if (sameRoot) {
      // No reason to remove and then add again.
    } else {
      // New parent in different space, so not displayed in this view anymore.
      if (this2._elements.hasOwnProperty(con.id)) {
        // Remove HTML element
        el = this2._elements[con.id];
        this2._el.removeChild(el);
        // Remove from memory.
        // JS feature: does not throw if does not exist
        delete this2._elements[con.id];
        delete this2._spacetaas[con.id];
      }
    }

  };

  var contentTransformedHandler = function (spacecontent) {
    // Update css transformation.
    // If a container has children, they must also be transformed.
    var cons, i, con, el;
    cons = spacecontent.getAllChildren();
    cons.push(spacecontent);

    for (i = 0; i < cons.length; i += 1) {
      con = cons[i];
      if (this2._elements.hasOwnProperty(con.id)) {
        if (con instanceof SpaceTaa) {
          el = this2._elements[con.id];
          // Make transformation
          transformImage(el, con);
        }
        // Else: no transformable representation for Views.
      }
    }
  };

  // View added to new parent.
  this.on('added', function (self, newParent) {
    // TODO add content of the new space.
    newParent.on('contentAdded', contentAddedHandler);
    newParent.on('contentRemoved', contentRemovedHandler);
    newParent.on('contentTransformed', contentTransformedHandler);
  });
  // View removed from parent.
  this.on('removed', function (self, oldParent) {
    // TODO remove content of the old space.
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
