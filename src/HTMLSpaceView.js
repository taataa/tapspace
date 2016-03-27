/*

View

*/
var Emitter = require('component-emitter');
var SpaceNode = require('./SpaceNode');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');
var SpaceRectangle = require('./SpaceRectangle');
var SpaceTaa = require('./SpaceTaa');
var SpaceHTML = require('./SpaceHTML');
var move = require('movejs');

// Disable animations by default.
move.defaults = { duration: 0 };

var HTMLSpaceView = function (space, htmlContainer) {
  // Test if valid dom element
  if (!('tagName' in htmlContainer)) {
    throw 'Container should be a DOM Element';
  }

  Emitter(this);
  SpaceNode(this);
  SpacePlane(this);
  Transformer(this);
  SpaceRectangle(this);
  var this2 = this;

  this._el = htmlContainer;

  // Two mappings from space taa ids:
  // 1. to HTML elements of the space nodes.
  // 2. to SpaceNode instances
  // Dev decision:
  //   For data structure, dict over list because key search time complexity.
  this._elements = {};
  this._nodes = {};

  (function initSize() {
    var w = this2._el.clientWidth;
    var h = this2._el.clientHeight;
    this2.resize([w, h]);
  }());

  var transformNode = function (htmlElement, spaceNode) {
    // Transform elements because the view orientation.
    // See 2016-03-05-09 for math.
    var node_global_T = spaceNode.getGlobalTransform();
    var T = this2._T.inverse().multiplyBy(node_global_T);
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
    move(htmlElement).matrix(s, r,-r, s, tx, ty).end();
  };

  var getViewSpecificId = function (spaceNodeId) {
    // Each rendered element has own ID. The ID differs from
    // the id of space nodes because a space node can become
    // visualized through multiple views.
    return this2.id + '/' + spaceNodeId;
  };

  // Listen the space for new or removed taas or transformations

  var contentAddedHandler = function (spaceNode, newParent, oldParent) {
    // Parameters:
    //   spaceNode: a SpaceNode i.e. the content unit that was added.
    //   newParent: optional. The new parent of the SpaceNode
    //     Not used for anything for now but probably in the future.
    //   oldParent: optional. The old parent of the SpaceNode.
    //     Not used for anything for now but probably in the future.
    if (typeof oldParent === 'undefined') { oldParent = null; }
    if (typeof newParent === 'undefined') { newParent = null; }

    var node, el, wh;

    // SpaceView, SpaceTaa ...
    node = spaceNode;

    if (this2._elements.hasOwnProperty(node.id)) {
      // Content is already drawn.
    } else {
      if (node instanceof SpaceTaa) {
        el = new Image(256, 256);
        el.src = node.taa.image.src;
        el.id = getViewSpecificId(node.id);
        el.className = 'taaspace-taa';
        // Show to client
        this2._el.appendChild(el);
        // Make referencable
        this2._elements[node.id] = el;
        this2._nodes[node.id] = node;
        // Make transformation
        transformNode(el, node);
      } else if (node instanceof SpaceHTML) {
        // Create container div.
        el = document.createElement('div');
        el.innerHTML = node.html;
        el.id = getViewSpecificId(node.id);
        el.className = 'taaspace-html';
        // Resize, and let taaspace styles do the rest.
        wh = node.getSize();
        el.style.width = wh[0] + 'px';
        el.style.height = wh[1] + 'px';
        // TODO react to size change
        // on resize reset the style.width and style.height
        node.on('resized', function () {
          // TODO remove listener
          var wh = node.getSize();
          el.style.width = wh[0] + 'px';
          el.style.height = wh[1] + 'px';
        });
        // Render
        this2._el.appendChild(el);
        // Make referencable
        this2._elements[node.id] = el;
        this2._nodes[node.id] = node;
        // Make transformation
        transformNode(el, node);
      } else if (node instanceof HTMLSpaceView) {
        // No representation for views.
      } else {
        throw new Exception('Unknown SpaceNode subtype; cannot represent');
      }
    }
  };

  var contentRemovedHandler = function (spaceNode, oldParent, newParent) {
    if (typeof oldParent === 'undefined') { oldParent = null; }
    if (typeof newParent === 'undefined') { newParent = null; }

    var sameRoot, el, node;

    node = spaceNode; // Alias

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
      if (this2._elements.hasOwnProperty(node.id)) {
        // Remove HTML element
        el = this2._elements[node.id];
        this2._el.removeChild(el);
        // Remove from memory.
        // JS feature of delete: does not throw if key does not exist
        delete this2._elements[node.id];
        delete this2._nodes[node.id];
      }
    }

  };

  var contentTransformedHandler = function (spaceNode) {
    // Update css transformation.
    // If the node has children, they must also be transformed.
    var nodes, i, node, el;
    nodes = spaceNode.getAllChildren();
    nodes.push(spaceNode);

    for (i = 0; i < nodes.length; i += 1) {
      node = nodes[i];
      if (this2._elements.hasOwnProperty(node.id)) {
        if (node instanceof SpaceTaa) {
          el = this2._elements[node.id];
          // Make transformation
          transformNode(el, node);
        } else if (node instanceof SpaceHTML) {
          el = this2._elements[node.id];
          transformNode(el, node);
        }
        // Else: no transformable representation for Views.
      }
    }
  };

  // View added to new parent.
  this.on('added', function (self, newParent) {
    // TODO add content of the new space if the space contains
    // nodes.
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
    var id, element, node;
    for (id in this2._elements) {
      if (this2._elements.hasOwnProperty(id)) {
        element  = this2._elements[id];
        node = this2._nodes[id];
        transformNode(element, node);
      }
    }
  });

  this.getElementBySpaceNode = function (spaceNode) {
    // Get HTML element representation of the space taa.
    if (this._elements.hasOwnProperty(spaceNode.id)) {
      return this._elements[spaceNode.id];
    }
  };

  this.getSpaceNodeByElementId = function (id) {
    // Get space taa by HTML element id
    // Return null if no space taa for such id.
    var i = id.split('/');
    var spaceViewId = i[0];
    var spaceNodeId = i[1];
    if (this.id === spaceViewId) {
      if (this._nodes.hasOwnProperty(spaceNodeId)) {
        return this._nodes[spaceNodeId];
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
