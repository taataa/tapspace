/*

View

*/
var Emitter = require('component-emitter');
var SpaceNode = require('./SpaceNode');
var SpacePlane = require('./SpacePlane');
var SpaceTransformer = require('./SpaceTransformer');
var SpaceRectangle = require('./SpaceRectangle');
var SpaceTaa = require('./SpaceTaa');
var SpaceHTML = require('./SpaceHTML');
var Space = require('./Space');
var move = require('movejs');

// Disable animations by default.
move.defaults = { duration: 0 };

var HTMLSpaceView = function (space, htmlContainer) {
  // Test if valid space
  if (!(space instanceof Space)) {
    throw 'Parent of a View must be a Space.';
  }
  // Test if valid dom element
  if (!('tagName' in htmlContainer)) {
    throw 'Container should be a DOM Element';
  }

  Emitter(this);
  SpaceNode(this);
  SpacePlane(this);
  SpaceTransformer(this);
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

  var _hasNodeId = function (nodeid) {
    return this2._elements.hasOwnProperty(nodeid);
  };

  var transformNode = function (htmlElement, spaceNode) {
    // Transform elements because the view orientation.
    // See 2016-03-05-09 for math.
    var node_global_T = spaceNode.getGlobalTransform();
    var T = this2._T.inverse().multiplyBy(node_global_T);
    // Current move.js does not prevent scientific notation reaching CSS
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
    return this2.id + '-' + spaceNodeId;
  };


  // Listen the space for new or removed nodes or transformations

  var transformedHandler = function (spaceNode) {
    // Update css transformation.
    // If the node has children, they must also be transformed
    // because the children do not emit transformed by themselves.
    var nodes, i, node, el;
    nodes = spaceNode.getDescendants();
    nodes.push(spaceNode);

    for (i = 0; i < nodes.length; i += 1) {
      node = nodes[i];
      if (_hasNodeId(node.id)) {
        if (node instanceof SpaceTaa) {
          el = this2._elements[node.id];
          transformNode(el, node);
        } else if (node instanceof SpaceHTML) {
          el = this2._elements[node.id];
          transformNode(el, node);
        }
        // Else: no transformable representation for Views.
      }
    }
  };

  var resizedHandler = function (node) {
    var el, wh;
    if (_hasNodeId(node.id)) {
      // Safeguard: if is a SpaceRectangle
      if (node.hasOwnProperty('resize')) {
        wh = node.getSize();
        el = this2._elements[node.id];
        el.style.width = wh[0] + 'px';
        el.style.height = wh[1] + 'px';
      }
    }
  };

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

    // Ensure the spaceNode is in same space. Otherwise,
    // if view's space has been just changed, a waiting
    // contentAdded event could add spaceNode from the old space.
    if (spaceNode.getRootParent() !== this2.getRootParent()) {
      return;
    }

    if (_hasNodeId(node.id)) {
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
        // Listen to further transformations
        node.on('transformed', transformedHandler);
        node.on('resized', resizedHandler);
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
        // Render
        this2._el.appendChild(el);
        // Make referencable
        this2._elements[node.id] = el;
        this2._nodes[node.id] = node;
        // Make transformation
        transformNode(el, node);
        // Listen to further transformations
        node.on('transformed', transformedHandler);
        node.on('resized', resizedHandler);
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
      if (_hasNodeId(node.id)) {
        // Remove HTML element
        el = this2._elements[node.id];
        this2._el.removeChild(el);
        // Remove from memory.
        // JS feature of delete: does not throw if key does not exist
        delete this2._elements[node.id];
        delete this2._nodes[node.id];
        // Remove handlers.
        node.off('transformed', transformedHandler);
        node.off('resized', resizedHandler);
      }
    }

  };

  // View added to new parent.
  this.on('added', function (self, newSpace, oldSpace) {
    var des, i;

    if (oldSpace === newSpace) {
      // Already set up. Do nothing.
      return;
    }

    // Render nodes from the new space.
    des = newSpace.getDescendants();
    for (i = 0; i < des.length; i += 1) {
      contentAddedHandler(des[i]);
    }

    // Start to listen for changes.
    newSpace.on('contentAdded', contentAddedHandler);
    newSpace.on('contentRemoved', contentRemovedHandler);
  });

  // View removed from parent.
  this.on('removed', function (self, oldSpace, newSpace) {
    var des, i;

    if (newSpace === oldSpace) {
      // Already set up. Do nothing.
      return;
    }

    // Stop listening for changes.
    oldSpace.off('contentAdded', contentAddedHandler);
    oldSpace.off('contentRemoved', contentRemovedHandler);

    // Remove all nodes from old space.
    des = oldSpace.getDescendants();
    for (i = 0; i < des.length; i += 1) {
      contentRemovedHandler(des[i]);
    }
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
    // Return null if not found.
    if (_hasNodeId(spaceNode.id)) {
      return this._elements[spaceNode.id];
    }
    return null;
  };

  this.getSpaceNodeByElementId = function (id) {
    // Get space taa by HTML element id
    // Return null if no space taa for such id.
    var i = id.split('-');
    var spaceViewId = i[0];
    var spaceNodeId = i[1];
    if (this.id === spaceViewId) {
      if (_hasNodeId(spaceNodeId)) {
        return this._nodes[spaceNodeId];
      }
    }
    return null;
  };

  this.getRootElement = function () {
    // Return the container HTML element.
    return this._el;
  };

  // Override the setParent so that only a Space
  // is allowed to become the parent.
  var superSetParent = this.setParent;
  this.setParent = function (space) {
    if (!(space instanceof Space)) {
      throw 'A View can only be a child of a Space';
    }
    superSetParent.call(this, space);
  };

  // View ready to be added to Space.
  this.setParent(space);
};

module.exports = HTMLSpaceView;
